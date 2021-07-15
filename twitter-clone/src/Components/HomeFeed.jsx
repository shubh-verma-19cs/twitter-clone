import React, {useEffect, useState } from 'react'
import "../CSS/HomeFeed.css"
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import LoopIcon from '@material-ui/icons/Loop';
import PublishIcon from '@material-ui/icons/Publish';
import TweetWrite from './TweetWrite'
import NameChange from './NameChange';
import Pusher from 'pusher-js'
import axios from 'axios'

const HomeFeed = () => {
    const [tweets, setTweets] = useState([]);
    const [mounted, setMounted] = useState(true);

    useEffect(()=>{
        const pusher = new Pusher('0916e12672e14b9b3e01', {
      cluster: 'ap2'
    });

        const channel = pusher.subscribe('twitterFeed');
    channel.bind('insert', (data)=> {
      setTweets([data.content, ...tweets])
    });
    return ()=>{
        channel.unsubscribe();
        channel.unbind_all();
    }
    });

    useEffect(()=>{
        const loadData =  async function(){
            const url = "http://localhost:5000/api/feeds"
            const {data} = await axios.get(url)
            if(mounted){
                setTweets(data)
            }
        }

        loadData();
        return ()=>{
            setMounted(false)
        };
    }, [mounted]);

    const likeFunction = ((ID)=>{
        const url = `https://localhost:5000/api/likes/${ID}`;
        axios.post(url).then((res)=>{
            console.log(res);

        }).catch((error)=>{
            console.log(error);
        })
    });

    const commentFunction = ((ID)=>{
        const url = `https://localhost:5000/api/comments/${ID}`;
        const comment = prompt("Enter a comment");
        const data = new FormData();
        data.append('comment',comment);
        axios.post(url,data).then(res=>{
            console.log(res);
        }).catch(error=>{
            console.log(error);
        })
    });

    const retweetFunction = ((ID)=>{
        
    });

    return (
        <div className="homeFeedContainer">
            {/* <NameChange /> */}
            <TweetWrite />

            <div className="feed">{
                tweets && <div className="feeds">
                    {
                        tweets.map(tweet=>{
                            return( <div className="feedContent">
                                <div className="userProf">
                                <Avatar alt="User" src={tweet.profile} />
                                </div>
                                <div className="tweet">
                                    <div className="user">
                                        <h4>User </h4>
                                        <h4 className="userTag">@user</h4>
                                        {
                                            tweet.retweet?<div><h3>retweeted</h3></div>:null
                                        }
                                    </div>
                                    <h4 className="text">{tweet.tweet}</h4>
                                    {
                                        tweet.file ?<div> <img src={tweet.file} alt=""/>
                                        {/* <video width='640' height= '480' controls>
                                            <source src={tweet.file} type='video' /></video> */}
                                            </div> : null
                                    }
                                    <div className="tweetIcons">
                                        <div className="comment">
                                            <ChatBubbleIcon onClick={()=>commentFunction(tweet._id)}/>
                                            <h5>{tweet.comments.length}</h5>
                                        </div>
                                        <div className="retweet">
                                            <LoopIcon onClick={()=>retweetFunction(tweet._id)}/>
                                        </div>
                                        <div className="likes">
                                            <FavoriteIcon onClick={()=>likeFunction(tweet._id)}/>
                                            <h5>{tweet.likes}</h5>
                                        </div>
                                        <div className="share">
                                            <PublishIcon />
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div>)
                        })
                    }
                </div>
            }
            </div>
        </div>
    )
}


export default HomeFeed
