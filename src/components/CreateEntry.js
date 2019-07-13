import React from 'react';
import axios from 'axios';
import './CreateEntry.css';
class CreateEntry extends React.Component{
    constructor(props){
        super(props);
        this.state={
            entry:""
        }
    }
    handlesubmit=(event)=>{
        event.preventDefault()
        this.props.check();
        let p=this.props.date
        let dt=p.day.toString()+p.month.toString()+p.year.toString()
        console.log(JSON.stringify(p))
        console.log(dt)
        axios.post('http://localhost:3000/insertinto/'+dt,{
            'entry':this.state.entry,
            'token':this.props.token,
            'date':p.day,
            'month':p.month,
            'year':p.year
        })
    }
    changeEntry=(event)=>{
        this.setState({
            entry:event.target.value.trim()
        })
    }
    render=()=>{
        return (
            <form  className='form-group' onSubmit={this.handlesubmit}>
                <textarea onChange={this.changeEntry} className='form-control' cols='2000'/>
                <br/>
                <button type='submit' >butt</button>
            </form>
        )
    }
}

export default CreateEntry;