import React from 'react'
import { ApolloConsumer } from "react-apollo";
import { withRouter } from 'react-router-dom';


const handleSignout = async (client, history)=>{
await localStorage.clear();
await client.resetStore();
history.push("/");
}

export const Signout = withRouter(({history, ...props}) => (

<ApolloConsumer>
	{client=>{
		return (
<button onClick={()=>handleSignout(client, history)}>SignOut</button>
		)
	}}
</ApolloConsumer>
))
