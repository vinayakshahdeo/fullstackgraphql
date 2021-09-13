	import {
		gql
	} from "apollo-boost";
	// Recipes queries
	export const GET_ALL_RECIPES = gql `{

			getAllRecipes{

				_id

				name

				category
				
			}
		
	}`;

	export const GET_RECIPE = gql `
	query ($_id: ID!) {
		getRecipe(_id: $_id) {
		_id
		name
		description
		category
		instructions
		createdDate
		likes
		}
	}
	`;

	// recipe mutations
	export const ADD_RECIPE = gql`
	mutation(
		$name: String!
		$description: String!
		$category: String!
		$instructions: String!
		$username: String){
		addRecipe(
			name: $name
			description: $description
			category: $category
			instructions: $instructions
			username: $username
		){
			_id
			name
			description
			category
			instructions
			createdDate
			likes
		}
	}
	`;

	// user queries
	export const GET_CURRENT_USER = gql `
	{
		getCurrentUser {
			
		username

		joinDate

		email
	}
	}

	`;
	//user mutations

	export const SIGNIN_USER = gql `
	mutation ($username: String!, $password: String!) {
		siginUser(username: $username,password: $password) {
		token
		}
	}
	`;

	export const SIGNUP_USER = gql `
		mutation ($username: String!, $email: String!, $password: String!) {
			signupUser(username: $username, email: $email, password: $password) {
			token
			} 
	}
	`