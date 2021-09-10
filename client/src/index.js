import React from 'react';
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

const client = new ApolloClient({
	uri: "http://localhost:4444/graphql"
})

const Root = () =>(	
	<Router>
		<Switch>

		<Route exact path="/" component={App} />	

		<Route path="/signin" component={Signin} />
		
		<Route path="/signup" component={Signup} />

		<Redirect to="/"/>

		</Switch>
	</Router>
	);

ReactDOM.render( 
	<ApolloProvider client={client}>
	<Root/>
	</ApolloProvider>,
	document.getElementById('root')
);