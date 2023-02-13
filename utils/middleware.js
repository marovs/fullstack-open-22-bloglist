const logger = require("./logger")

const morgan = require("morgan")

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
	}

	logger.error(error.message)

	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
}