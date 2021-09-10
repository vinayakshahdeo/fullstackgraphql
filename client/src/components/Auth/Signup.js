import React, {useState} from 'react'
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
export const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleChange = ({target:{name, value}})=>{
		if(name==="username"){
			setUsername(value)
		}else if(name==="password"){
			setPassword(value)
		}else if(name==="email"){
			setEmail(value)
		}else{
			setConfirmPassword(value)
		}
	}

	const handleSubmit=(event, signupUser) => {
		event.preventDefault();
		signupUser().then(data=>{
			console.log(data);
		})
	}

	return (
		<div className="App">
			<h2 className="App">Sign Up</h2>
			<Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
				{(signupUser,{data, loading, error})=>{
					return( 
					<form className="form" onSubmit={(event)=>handleSubmit(event, signupUser)}>
						<input type="text" name="username" placeholder="Username" onChange={handleChange} value={username}/>
						<input type="text" name="email" placeholder="Email" onChange={handleChange} value={email}/>
						<input type="text" name="password" placeholder="password" onChange={handleChange} value={password}/>
						<input type="text" name="confirmpassword" placeholder="Confirm Password" onChange={handleChange} value={confirmPassword}/>
					<button type="submit" className="button-primary">Submit</button>
					</form>
				)
				}}
			</Mutation>
		</div>
	)
}
