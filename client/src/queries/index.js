import {
	gql
} from "apollo-boost";
// Recipes queries
export const GET_ALL_RECIPES = gql `{

		getAllRecipes{

			name

			category

			description

			instructions

			likes

			createdDate
			
		}
	
}`;
// recipe queries

// user queries

//user mutations
export const SIGNUP_USER = gql`
	mutation ($username: String!, $email: String!, $password: String!) {
		signupUser(username: $username, email: $email, password: $password) {
		  token
		} 
}
`