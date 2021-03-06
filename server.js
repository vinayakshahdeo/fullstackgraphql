	const express = require("express");

	const mongoose = require("mongoose");

	require('dotenv').config({
		path: "variables.env"
	})

	const {
		graphiqlExpress,
		graphqlExpress
	} = require("apollo-server-express")

	const {
		makeExecutableSchema
	} = require("graphql-tools");

	const {
		typeDefs
	} = require("./schema");

	const {
		resolvers
	} = require("./resolvers")

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers
	})

	const Recipe = require("./models/Recipe")

	const User = require("./models/User")

	const cors = require("cors");

	const jwt = require("jsonwebtoken");

	const bodyParser = require("body-parser");

	mongoose.connect(process.env.MONGO_URI)
		.then(() => console.log("connected to mongo"))
		.catch(e => console.error(e))

	const app = express();

	const corsOptions = {
		origin: "http://localhost:3000",
		credentials: true
	}

	app.use(cors(corsOptions));

	app.use(async (req, res, next) => {
		const token = req.headers["authorization"];
		if (token !== "null") {
			try {
				const currentUser = await jwt.verify(token, process.env.SECRET)
				console.log(currentUser)
				req.currentUser = currentUser;
			} catch (err) {
				console.error(err)
			}
		}
		next();
	})

	app.use("/graphiql", graphiqlExpress({
		endpointURL: "/graphql"
	}))

	app.use("/graphql",
		express.json(),
		graphqlExpress(({
			currentUser
		}) => ({
			schema,
			context: {
				Recipe,
				User,
				currentUser
			}
		})))

	const PORT = process.env.port || 4444;

	app.listen(PORT, () => {
		console.log(`server listening on ${PORT}`)
	})