import React from 'react'

const Error = ({error:{message}})=>(
		<p className="text-danger">
			{message}
		</p>
	)

export default Error;