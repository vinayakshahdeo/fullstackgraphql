import React, { useState, useEffect } from 'react'
import { Mutation } from "react-apollo";
import { ADD_RECIPE, GET_ALL_RECIPES } from '../../queries';
import Error from "../Error";
import { withRouter } from "react-router-dom";


const AddRecipe = ({session:{getCurrentUser}, history, ...props}) => {

	const [name, setName]=useState("")
	const [category, setCategory]=useState("Breakfast")
	const [description, setDescription]=useState("")
	const [instructions, setInstructions]=useState("")
	const [username, setUsername] = useState("");


	// componnet did mount

		useEffect(() => {
			if(getCurrentUser.username!==null){
				setUsername(getCurrentUser.username)
		}
		}, [getCurrentUser])

	const handleChange = ({target:{name, value}})=>{
		if(name=== "name"){
			setName(value)
		}else if(name === "category"){
			setCategory(value)
		}else if(name==="description"){
			setDescription(value)
		}else{
			setInstructions(value)
		}

	}

	const handleSubmit = (event, addRecipe)=>{
		event.preventDefault();
		addRecipe().then(async ({data})=>{
			console.log(data)
			setName("");
			setDescription("");
			setInstructions("");
			setCategory("Breakfast");
			history.push("/");
		})
	}

	const validateForm = () => !name||!category||!description||!instructions;

	const updateCache = (cache, {data:{addRecipe}})=>{
	const {getAllRecipes}= cache.readQuery({query: GET_ALL_RECIPES})
	cache.writeQuery({
		query: GET_ALL_RECIPES,
		data:{
			getAllRecipes:[addRecipe, ...getAllRecipes]
		}
	})
	}

    return (
		<div className="App">
		<h2 className="main-title">Add Recipe</h2>
		<Mutation
		  mutation={ADD_RECIPE}
		  variables={{
			name,
			category,
			description,
			instructions,
			username
		  }}
		  update={updateCache}
		>
		  {(addRecipe, { data, loading, error }) => {
			return (
				<form className="form" onSubmit={(event)=>{handleSubmit(event, addRecipe)}}>
				  <label htmlFor="name">Recipe Name</label>
				  <input
					type="text"
					name="name"
					placeholder="Add Name"
					onChange={handleChange}
					value={name}
				  />
				  <label htmlFor="category">Category of Recipe</label>
				  <select
					name="category"
					onChange={handleChange}
					value={category}
				  >
					<option value="Breakfast">Breakfast</option>
					<option value="Lunch">Lunch</option>
					<option value="Dinner">Dinner</option>
					<option value="Snack">Snack</option>
				  </select>
				  <label htmlFor="description">Recipe Description</label>
				  <input
					type="text"
					name="description"
					placeholder="Add Description"
					onChange={handleChange}
					value={description}
				  />
				  <label htmlFor="instructions">Recipe Instructions</label>
					<input
					type="text"
					name="instructions"
					placeholder="Add instructions"
					onChange={handleChange}
					value={instructions}
				  />
				  <button
					disabled={loading || validateForm()}
					type="submit"
					className="button-primary"
				  >
					Submit
				  </button>
				  {error && <Error error={error} />}
				</form>
			);
		  }}		  
		</Mutation>
		</div>
	  );
}

export default withRouter(AddRecipe);
