import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import "../CSS/TweetWrite.css"
import axios from 'axios'

const TweetWrite = () => {

    const profileImage = localStorage.getItem("pp") || "";
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState("");

    const Tweet = (e) => {
        const url = "http://localhost:5000/api/tweet-upload";
        const token = localStorage.getItem("sid");

        const data = new FormData();
        data.append("tweet", tweet);
        data.append("file",file);

        axios
            .post(url, data, {
                headers:{
                    "Authorization":token,
                },
            })
            .then((response) =>{
                console.log(response);
                alert(response.data.msg);
                setTweet("");
                setFile("");
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    return (
        <div className="tweetWriteContainer">
            <div className="homeTitle">
                <h3>Home</h3>
            </div>
                <div className="TweetWrite">
                <Avatar alt="User" src={profileImage} />
                <input type="text" placeholder="What's happening?" size="60" onChange={(e)=> setTweet(e.target.value)} value={tweet}/>
                </div>
                <div className="tweetFileUpload">
                    <div className="file">
                    <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    <div className="tweetButton">
                        <button disabled={tweet === ""} onClick={Tweet}>Tweet</button>
                    </div>
                </div>
        </div>
    )
}

export default TweetWrite
