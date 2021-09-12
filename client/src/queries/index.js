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