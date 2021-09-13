import React from 'react';
import { Link } from "react-router-dom";
export const RecipeItem = ({name, category, _id}) => {
	return (
				<li>
				<Link to={`recipe/${_id}`}>
					<h4>{name}</h4>
				</Link>
					<p><strong>{category}</strong></p>
				</li>
	)
}
