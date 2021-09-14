import React from 'react'
import {Link} from "react-router-dom"

const SearchItem = ({_id, name, likes}) => {
	return (
			<li>
				<Link to={`/recipe/${_id}`}>
					<h4>{name}</h4>
				</Link>
				<h5>Likes: {likes}</h5>
			</li>
	)
}

export default SearchItem
