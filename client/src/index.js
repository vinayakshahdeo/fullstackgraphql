import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import ApolloClient from "apollo-boost";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {
	ApolloProvider
} from "react-apollo";
import { Signin } from './components/Auth/Signin';
import { Signup } from './components/Auth/Signup';
import withSession from './components/withSession';
import { Navbar } from './components/Navbar';
import Search from './components/Recipe/Search';
import Profile from './components/Profile/Profile';
import AddRecipe from './components/Recipe/AddRecipe';


const client = new ApolloClient({
	uri: "http://localhost:4444/graphql",
	fetchOptions:{
		credentials:"include"
	},
	 request:	operation	=>{
		 const token = localStorage.getItem("token");
		 operation.setContext({
			 headers:{
				 authorization: token
			 }
		 })

	},
	onError:({networkError}) => {
		if(networkError){
			console.log("network Error", networkError)
			if(networkError.statusCode===401){
				localStorage.removeItem("token")
			}
		}
	}
})

const Root = ({refetch, session}) =>(	
	<Router>
		<Fragment>
		<Navbar session={session}/>
			
		<Switch>

		<Route exact path="/" component={App} />	

		<Route exact path="/profile" component={Profile} />	

		<Route exact path="/recipe/add" component={AddRecipe} />	

		<Route exact path="/search" component={Search} />	

		<Route path="/signin" render={ () => <Signin refetch={refetch}/> } />
		
		<Route path="/signup"  render={ () => <Signup refetch={refetch}/> } />

		<Redirect to="/"/>

		</Switch>
		</Fragment>
	</Router>
	);

const RootWithSession = withSession(Root);


ReactDOM.render( 
	<ApolloProvider client={client}>
	<RootWithSession />
	</ApolloProvider>,
	document.getElementById('root')
);