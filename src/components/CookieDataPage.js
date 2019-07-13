import React from 'react';
import axios from 'axios';
import {yo} from '../utils.js';
class CookieDataPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            "validity":""
        }
    }
    getvaliditystatus=()=>{
        let str=this.props.cookies.get('token')
        axios.post('http://localhost:3000/isvalid',{
            "token":str
        }).then((data)=>{
            this.setState({
                "validity":data.data['status']
            })
        })
    }
    render=()=>{
        if(this.state.validity===""){
            this.getvaliditystatus();
        }
        return (
            <div>
                Cdp
                {this.state['validity'].toString()}
            </div>
        )
    }
}

export default CookieDataPage;