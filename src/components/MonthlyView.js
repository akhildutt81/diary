import React from 'react';
import './MonthlyView.css';
import axios from 'axios';
import DayView from './DayView';
import {Cookies,withCookies} from 'react-cookie';
class MonthlyView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            'month':this.props.cookies.get('month'),
            'year':this.props.cookies.get('year'),
            'daysdata':null,
        }
        console.log(this.props.cookies)
    }
    loaddata=()=>{
        let d=this.props.date
        console.log(d)
        let val=axios.post(`http://localhost:3000/getentry/${d.year}/${d.month}/`,{
            'token':this.props.token    
        }).then(data=>{
            let dd=[]
            console.log("got")
            console.log(data.data)
            console.log("for")
            console.log(JSON.stringify(d))
            data.data.forEach((day)=>{
                dd.push(
                <DayView 
                    month={this.state.month} 
                    year={this.state.year} 
                    day={day[0]} 
                    changeDate={this.props.changeDate}/ >
                )
            })
            this.setState({
                daysdata:dd
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    render=()=>{
        if(this.state.daysdata==null)this.loaddata()
        return (
            this.state.daysdata==null?
            <div>
            {this.props.date.date+this.props.date.month+this.props.date.year}
            </div>:
            <div className='days'>{this.state.daysdata}</div>
        )
    }
}

export default withCookies(MonthlyView);