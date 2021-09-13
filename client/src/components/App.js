	import React from 'react';
	import './App.css';
	import { Query } from "react-apollo";
	import { GET_ALL_RECIPES } from "../queries";
import { RecipeItem } from './Recipe/RecipeItem';
import Error from './Error';

	const App = () => {
		return (<div className="App" >
			<h1>Home</h1>
			<Query query={GET_ALL_RECIPES}>

			{({data, loading, error}) => {

				if(loading) return <div>Loading...</div>

				if(error) return(<Error error={error}/>)

				return(<ul>{data.getAllRecipes.map((recipe)=><RecipeItem key={recipe._id} {...recipe}/>)}</ul>)
			}}

			</Query>
			</div>)
	}
	export default App;