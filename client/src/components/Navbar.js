import React, {Fragment} from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = ({session}) => {
	console.log("test ", session, session.getCurrentUser, session && session.getCurrentUser)
	return (
		<nav>
		{session && session.getCurrentUser ? <NavbarAuth session={ session } />:<NavbarUnAuth/>}
		</nav>
	)
}

const NavbarUnAuth = () => {
	return (
	<Fragment>
		<ul>
			<li>
			<NavLink exact to="/">Home</NavLink>
			</li>
			<li>
			<NavLink exact to="/search">Search</NavLink>
			</li>
			<li>
			<NavLink exact to="/signin">Sign In</NavLink>
			</li>
			<li>
			<NavLink exact to="/signup">Sign Up</NavLink>
			</li>
		</ul>
	</Fragment>
	)
}

const NavbarAuth = ({session}) => {
	return (
		<Fragment>
			<ul>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/recipe/add">Add Recipe</NavLink>
				</li>
				<li>
					<NavLink to="/profile">Profile</NavLink>
				</li>
				<li>
					<button>SignOut</button>
				</li>
			</ul>
			<h4>Welcome <strong>{session.getCurrentUser.username}</strong></h4>
			</Fragment>
	)
}
