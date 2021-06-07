import React from 'react'
import "../../CSS/SideBarLayout.css"
const SidebarLayout = ({Icon, text}) => {
    return (
        <div className="sideBarLayout">
            <Icon />
            <h4 className="sideBarLayoutText">{text}</h4>
        </div>
    )
}

export default SidebarLayout
