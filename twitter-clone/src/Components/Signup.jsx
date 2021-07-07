import React, { Component } from 'react';
import '../CSS/SignUp.css';
import axios from 'axios' ;
import {Link} from 'react-router-dom';

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            verifiedPassword:'',
            image:null
        }
        this.handleForm = this.handleForm.bind(this);
        this.signup = this.signup.bind(this);
    }
    handleForm(e){
        this.setState({
            [e.target.id]:e.target.files ? e.target.files[0] : e.target.value,
        });
    }
    signup(e){
        e.preventDefault();
        const data = new FormData();
        data.append('username',this.state.username);
        data.append('password',this.state.password);
        data.append('verifiedPassword',this.state.verifiedPassword);
        data.append('profileImage',this.state.image);

        const url = "https://localhost:5000/api/user-register";
        axios
            .post(url, data)
            .then((response)=>{
                alert(response.data.msg);
            })
            .catch(
                (error)=>{
                    console.log(error);
                }
            );
    }
    render() {
        return (
            <div className="formContainer">
            
                <form className="Form">
                    <label>Username</label>
                    <input onChange={this.handleForm} type="text" placeholder="Username" id="username"/>
                    <label>Password</label>
                    <input onChange={this.handleForm} type="password" placeholder="Password" id="password"/>
                    <label>Confirm Password</label>
                    <input onChange={this.handleForm} type="password" placeholder="Password" id="verifiedPassword"/>
                    <label>Profile Picture</label>
                    <input onChange={this.handleForm} type="file" id="image" />
                    <button onClick={this.signup}>SignUp</button>
                    <Link to='/user-signin'>
                        <button>LOGIN</button>
                    </Link>
                </form>
            </div>
        )
    }
}
