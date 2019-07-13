import React from 'react';
import './Home.css';
import axios from 'axios';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    handlesubmit=(event)=>{
        event.preventDefault()
        this.props.check();
    }
    render=()=>{
        console.log(this.props)
        console.log(this.props)
        return (
            <div>
            {this.props.date.day+this.props.date.month+this.props.date.year}
            </div>
        )
    }
}

export default Home;