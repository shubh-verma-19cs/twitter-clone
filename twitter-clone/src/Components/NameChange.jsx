import React from 'react'

const NameChange = () => {
    return (
        <div>
            <div>
                <label htmlFor="">
                    Change Name:
                    <input type="text" name="username" id="username" defaultValue="User"/>
                </label>
            </div>
        </div>
    )
}

export default NameChange