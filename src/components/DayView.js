import React from 'react';
import './Home.css';
import axios from 'axios';
import './DayView.css';
import { BrowserRouter as Router, Route, Link ,Switch ,Redirect} from "react-router-dom"; 
class DayView extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    gotodate=(event)=>{
        let date={
            "day":this.props.day,
            "month":this.props.month,
            "year":this.props.year,
        }
        this.props.changeDate({date})
    }
    render=()=>{
        let styles={
          textDecoration: 'none',
        }
        let url=this.props.day+'/'+this.props.month+'/'+this.props.year;
        return (
            <div className='card1'>
                <Link 
                    style={styles}
                    className='link'
                    to={'/Day/'+url}
                    onClick={this.gotodate}
                >{this.props.day}</Link>
            </div>
        )
    }
}

export default DayView;