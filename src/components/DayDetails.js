import React from 'react';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';
class DayDetails extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }
    componentDidMount=()=>{
        console.log(this.props)
        let d=this.props.date
        console.log("d")
        console.log(d)
        let val=axios.post(`http://localhost:3000/getentry/${d.year}/${d.month}/${d.day}`,{
            'token':this.props.cookies.cookies.token  
        }).then(data=>{
            let dd=[]
            console.log("got")
            console.log(data.data)
            console.log("for")
            console.log(JSON.stringify(d))
        }).catch((err)=>{
            console.log(err)
        })
    }
    render=()=>{
        return (
            <div></div>
        )
    }
}

export default withCookies(DayDetails);