import React from 'react'
import {withRouter} from "react-router-dom";
import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';
import Error from '../Error';

const RecipePage = ({match:{params:{_id}}}) => {
	return (
		<Query query={GET_RECIPE} variables={{_id}}>
		{(({data, loading, error})=>{
			if(loading) return <div>Loading...</div>

			if(error) return( <Error error={error}/>)
;			return (<div className="App">
				<h2>{data.getRecipe.name}</h2>
				<p>Category:{data.getRecipe.category}</p>
				<p>Description:{data.getRecipe.description}</p>
				<p>Instructions:{data.getRecipe.instructions}</p>
				<p>Likes:{data.getRecipe.likes}</p>
				<p>Created By:{data.getRecipe.username}</p>
				<button>Like</button>
			</div>)
			})}
		</Query>
	)
}

export default withRouter(RecipePage);