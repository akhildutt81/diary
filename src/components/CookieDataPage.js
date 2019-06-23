import React from 'react';
import axios from 'axios';
class CookieDataPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            "validity":""
        }
    }
    getvaliditystatus=()=>{
        let str=this.props.cookies.get('token')
        console.log(str)
        axios.post('http://localhost:3000/isvalid',{
            "token":str
        }).then((data)=>{
            this.setState({
                "validity":data.data['status']
            })
        })
    }
    render=()=>{
        console.log("render",this.props.cookies.get('token'))
        if(this.state.validity===""){
            this.getvaliditystatus();
        }
        return (
            <div>
                Cdp
                {this.state['validity']}
            </div>
        )
    }
}

export default CookieDataPage;