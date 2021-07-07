import React, { Component } from 'react';
import '../CSS/SignUp.css';
import axios from 'axios' ;
import { Link } from 'react-router-dom';

export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            
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
        

        const url = "https://localhost:5000/api/user-login";
        axios
            .post(url, data)
            .then((response)=>{
                console.log(response);
                localStorage.setItem("sid", response.data.token);
                localStorage.setItem("pp",response.data.profPic);
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
                    
                    <button onClick={this.signup}>LogIn</button>
                    <Link to='/user-signup'>
                        <button>SIGNUP</button>
                    </Link>
                </form>
            </div>
        )
    }
}
