import React from 'react';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';
class LogIn extends React.Component{
    constructor({changeToken}){
        super();
        this.state={
            username:"",
            password:"",
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/login',{
            username:this.state.username,
            password:this.state.password,
        }).then((data)=>{
            let tok=data.data['token']
            if (tok!==null){
                this.props.cookies.set("token",tok,{
                    "maxAge":75
                })
                this.props.changeToken(tok);
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    componentWillMount=()=>{
        let {cookies}=this.props;
    }
    changeinp=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    render=()=>{
        let uname=this.state.username;
        let passw=this.state.password;
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' name='username' value={uname} onChange={this.changeinp}/>
                <input type='text' name='password' value={passw} onChange={this.changeinp}/>
                <button type='submit'>LogIn</button>
            </form>
        )
    }
}

export default withCookies(LogIn);