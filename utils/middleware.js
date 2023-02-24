const logger = require("./logger")

const morgan = require("morgan")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

morgan.token("body", (request) => {
	return JSON.stringify(request.body)
})

const requestLogger = morgan(":method :url :status :res[content-length] - :response-time ms :body")

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: "unknown endpoint"})
}

const errorHandler = (error, request, response, next) => {
	switch (error.name) {
	case "CastError":
		return response.status(400).send({error: "malformed id"})
	case "IdError":
		return response.status(404).json({error: error.message})
	case "ValidationError":
		return response.status(400).json({error: error.message})
	case "JsonWebTokenError":
		return response.status(400).json({error: error.message})
	case "TokenExpiredError":
		return response.status(401).json({error: "token expired"})
	}

	logger.error(error.message)

	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization")
	if (authorization && authorization.startsWith("Bearer ")) {
		request.token = authorization.replace("Bearer ", "")
	} else {
		request.token = null
	}

	next()
}

const userExtractor = async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({error: "token invalid"})
	}
	request.user = await User.findById(decodedToken.id)

	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}