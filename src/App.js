import React from 'react';
import './App.css';
import axios from 'axios';
import {Cookies,withCookies} from 'react-cookie';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import CookieDataPage from './components/CookieDataPage'
import { BrowserRouter as Router, Route, Link ,Switch ,Redirect} from "react-router-dom";
class  App extends React.Component {
	constructor(props){
		super(props);
		this.state={"token":null,"error":false}
	}
	componentDidMount=()=>{
		this.setState({
			"token":this.props.cookies.get("token")
		})
	}
	changeToken=(newtoken)=>{
		console.log(newtoken)
		this.setState({"token":newtoken})
	}
	logoutfunc=()=>{
		if(this.state['token']!=null){
			this.setState({'token':null})
		}
		this.props.cookies.remove('token')
	}
	render=()=>{
		let styles={
		  textDecoration: 'none',
		}
		let loggedOutComp=(
			<div>
				<Link className="item" to='/CreateUser' style={styles}>
		    		Sign Up
		    	</Link>
		    	<Link className="item" to='/LogInUser' style={styles}>
		    		Log In
		    	</Link>
		    </div>
		);
		let loggedInComp=(
			<div>
				<Link className="item" to='/' onClick={this.logoutfunc} style={styles}>
		    		Log out
		    	</Link>
		    </div>
		);
	    return (
	    	<Router>
		    	<span className="navbar">
		    		<div className='item'>
		    			<center><h1> My Diary</h1></center>
		    			<center><h5>{this.state.token}</h5></center>
		    		</div>
		    		{this.state.token==null?loggedOutComp:loggedInComp}
		    		<div className="items">
						<Link className="item" to="/CreateEntry" style={styles}>
							Create Entry
						</Link>
						<Link className="item" to="/MonthlyView" style={styles}>
							Monthly View
						</Link>
						<Link className="item" to="/WeeklyView" style={styles}>
							Weekly View
						</Link>

						<Link className="item" to="/ViewCookie" style={styles}>
							Cookiedata
						</Link>
		    		</div>
		    	</span>
		    	<span className="ee"> 
			    	<Switch>
				    	<Route exact path='/CreateUser' render={
				    		()=><SignUp changeToken={this.changeToken}/>		
				    	} />
			    		<Route exact path='/CreateEntry' component={Home} />
			    		<Route exact path='/LogInUser' render={
			    			()=><LogIn changeToken={this.changeToken}/>
			    		} />
			    		<Route exact path='/ViewCookie' render={
			    			()=><CookieDataPage 
			    					cookies={this.props.cookies} 
			    				CookieDataPage/>
			    		}/>
			    	</Switch>
			    </span>
		    </Router>
	    );
	}
}

export default withCookies(App);