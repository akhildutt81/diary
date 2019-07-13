import React from 'react';
//import './App.css';
import DayDetails from './components/DayDetails';
import {withRouter} from 'react-router-dom';
import './App2.css';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import CreateEntry from './components/CreateEntry';
import CookieDataPage from './components/CookieDataPage'
import MonthlyView from './components/MonthlyView'
import { BrowserRouter as Router, Route, Link ,Switch ,Redirect} from "react-router-dom";
class  App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			"token":null,
			"error":false,
			"date":this.getDate(),
		}
	}
	changeDate=(date)=>{
		console.log(JSON.stringify(date));
	}
	getDate=()=>{
		let d=new Date()
		return {
			day:d.getDate().toString().padStart(2,'0'),
			month:d.getMonth().toString().padStart(2,'0'),
			year:d.getFullYear().toString()
		}
	}
	componentDidMount=()=>{
		this.setState({
			"token":this.props.cookies.get("token")
		})
		this.props.cookies.set("year",this.state.date.year,{
			maxAge:6000
		})
		this.props.cookies.set("month",this.state.date.month,{
			maxAge:6000
		})
	}
	changeToken=(newtoken)=>{
		this.setState({"token":newtoken})
	}
	loggedin=async ()=>{
		let b=await axios.post("http://localhost:3000/isValid",{
			"token":this.state['token']
		})
		return b.data.status
	}
	handleLogInuser=()=>{
		if(this.loggedin()==true){
			return <Home />
		}
		return <LogIn changeToken={this.changeToken}/>
	}
	check=()=>{
		axios.post("http://localhost:3000/isValid",{
			"token":this.state['token']
		}).then(data=>{
			console.log(data.data)
			if(!data.data.status){
				this.logoutfunc()
			}
		})
	}
	logoutfunc=()=>{
		if(this.state['token']!=null){
			this.setState({'token':null})
		}
		this.props.cookies.remove('token')
		this.render();
	}
	handleCreateUser=()=>{
		return <SignUp changeToken={this.changeToken}/>
	}
	handleHome=()=>{
		console.log("handle home")
		return <Home token={this.state['token']} date={this.state.date} check={this.check}/>
	}
	handleCreateEntry=(prm)=>{
		return <CreateEntry date={this.state.date} token={this.state['token']} check={this.check}/>
	}
	handleDayDetails=(par)=>{
		console.log(par.match.params)
		return <DayDetails date={par.match.params}/>;
	}
	handleMonthlyView=()=>{
		return <MonthlyView 
			date={this.state.date} 
			token={this.state.token} 
			check={this.check} 
			changeDate={this.changeDate}
			numberofddays='1'/>
	}
	render=()=>{
		console.log("rendering")
		let state=this.state
		let styles={
		  textDecoration: 'none',
		  color:'#3a4248',
		}
		let loggedOutComp=(
			<div className='item1'>
				<div className='item2'>
				<Link  to='/CreateUser' style={styles}>
		    		Sign Up
		    	</Link></div>
		    	<div className='item2'>
		    	<Link   to='/LogInUser' style={styles}>
		    		Log In
		    	</Link></div>
		    </div>
		);
		let loggedInComp=(
			<div className='item'>
				<Link  to='/' onClick={this.logoutfunc} style={styles}>
		    		Log out
		    	</Link>
		    </div>
		);
	    return (
	    	<Router>
	    		<div className='total'>
		    		<span className='flexitem1'>
				    	<div className='container'>
				    			<div className='item' onClick={this.check}>
					    			<Link to="/HomePage"  style={styles}> 
					    				My Diary
					    			</Link>
				    			</div>
				    			{this.state.token==null?loggedOutComp:loggedInComp}
				    			<div className='item'>
									<Link  
									 to={"/InsertEntry/"+state.date.date+state.date.month+state.date.year}
									 onClick={this.check} style={styles}>
										Create Entry
									</Link>
								</div>
								<div className='item'>
									<Link  to="/MonthlyView" onClick={this.check} style={styles}>
										Monthly View
									</Link>
								</div>
								<div className='item'>
									<Link to="/WeeklyView" onClick={this.check} style={styles}>
										Weekly View
									</Link>
								</div>
								<div className='item'>
									<Link  to="/ViewCookie" onClick={this.check} style={styles}>
										Cookiedata
									</Link>
								</div>
				    	</div>
				   	</span>
			    	<span className='flexitem2'>
				    	<Switch>
				    		<Route exact path='/HomePage' render={this.handleHome} />
				    		<Route exact path='/MonthlyView' render={this.handleMonthlyView} />
					    	<Route exact path='/CreateUser' render={this.handleCreateUser} />
				    		<Route path='/InsertEntry/:date' render={this.handleCreateEntry} />
				    		<Route exact path='/LogInUser' render={this.handleLogInuser} />
				    		<Route exact path='/ViewCookie' render={
				    			()=><CookieDataPage 
				    					cookies={this.props.cookies} 
				    				CookieDataPage/>
				    		}/>
				    		<Route exact path='/Day/:day/:month/:year' render={this.handleDayDetails} />
				    		<Redirect from='/' to='/LogInUser'/>
				    	</Switch>
				    </span>
				</div>
		    </Router>
	    );
	}
}

export default withCookies(App);