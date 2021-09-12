import React, {useState} from 'react'
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
import Error from "../Error";
import { withRouter } from "react-router-dom";

export const Signup = withRouter(({history, ...props}) => {
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
		signupUser().then(async ({data})=>{
			console.log(data);
			localStorage.setItem("token", data.signupUser.token);
			await props.refetch();
			setUsername("");
			setEmail("");
			setConfirmPassword("");
			setPassword("");
			history.push("/");
		})
	}

	const validateForm = ()=>!username||!email||!password||password!==confirmPassword;

	return (
		<div className="App">
			<h2 className="App">Sign Up</h2>
			<Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
				{(signupUser,{data, loading, error})=>{
					return( 
					<form className="form" onSubmit={(event)=>handleSubmit(event, signupUser)}>
						<input type="text" name="username" placeholder="Username" onChange={handleChange} value={username} autoComplete="on"/>
						<input type="text" name="email" placeholder="Email" onChange={handleChange} value={email} autoComplete="on"/>
						<input type="password" name="password" placeholder="password" onChange={handleChange} value={password} autoComplete="off"/>
						<input type="password" name="confirmpassword" placeholder="Confirm Password" onChange={handleChange} value={confirmPassword} autoComplete="off"/>
						<button disabled={loading || validateForm()} type="submit" className="button-primary">Submit</button>
					{error && <Error error={error}/>}
					</form>
				)
				}}
			</Mutation>
		</div>
	)
})