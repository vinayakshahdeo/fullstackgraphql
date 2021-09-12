import React, {useState} from 'react'
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import Error from "../Error";
import { withRouter } from "react-router-dom";

export const Signin = withRouter(({history, ...props}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleChange = ({target:{name, value}})=>{
		if(name==="username"){
			
			setUsername(value)
		}else{
			setPassword(value)
		}
	}

	const handleSubmit=(event, signinUser) => {
		event.preventDefault();
		signinUser().then(async ({data})=>{			
			localStorage.setItem("token", data.siginUser.token);
			await props.refetch();
			setUsername("");
			setPassword("");
			history.push("/");
		})
	}

	const validateForm = ()=>!username||!password;

	return (
		<div className="App">
			<h2 className="App">Sign In</h2>
			<Mutation mutation={SIGNIN_USER} variables={{username, password}}>
				{(signinUser,{data, loading, error})=>{
					return( 
					<form className="form" onSubmit={(event)=>handleSubmit(event, signinUser)}>
						<input type="text" name="username" placeholder="Username" onChange={handleChange} value={username}/>
						<input type="password" name="password" placeholder="password" onChange={handleChange} value={password}/>
						<button disabled={loading || validateForm()} type="submit" className="button-primary">Submit</button>
					{error && <Error error={error}/>}
					</form>
				)
				}}
			</Mutation>
		</div>
	)
})
