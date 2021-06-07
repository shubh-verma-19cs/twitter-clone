import React from 'react'
import HomeFeed from './HomeFeed'
import Sidebar from './Sidebar/Sidebar'
import Trends from './Trends'
import "../CSS/Home.css"

const Home = () => {
    return (
        <div className="homeContainer">
            <Sidebar />
            <HomeFeed />
            <Trends />
        </div>
    )
}

export default Home
