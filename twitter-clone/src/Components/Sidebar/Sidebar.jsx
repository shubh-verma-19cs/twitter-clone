import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter';
import ExploreIcon from '@material-ui/icons/Explore';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ListAltIcon from '@material-ui/icons/ListAlt';
import HomeIcon from '@material-ui/icons/Home';
import SidebarLayout from './SidebarLayout';
import "../../CSS/Sidebar.css"

const Sidebar = () => {
    return (
        <div className="sidebarContainer">
            <div className="homeIcon">
                <TwitterIcon className="twitterIcon"/>
            </div>
            <div className="SideBar">
                <SidebarLayout Icon={HomeIcon} text={'Home'} />
                <SidebarLayout Icon={ExploreIcon} text={'Explore'} />
                <SidebarLayout Icon={NotificationsActiveIcon} text={'Notifications'} />
                <SidebarLayout Icon={EmailIcon} text={'Messages'} />
                <SidebarLayout Icon={TurnedInIcon} text={'Bookmarks'} />
                <SidebarLayout Icon={ListAltIcon} text={'Lists'} />
                <SidebarLayout Icon={PersonIcon} text={'Profile'} />
                <SidebarLayout Icon={MenuIcon} text={'More'} />
            </div>
        </div>
    )
}

export default Sidebar
