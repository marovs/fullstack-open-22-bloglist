const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body

	if (!body.title) {
		return response.status(400).json({
			error: "title is missing"
		})
	}
	if (!body.url) {
		return response.status(400).json({
			error: "url is missing"
		})
	}

	body.likes = body.likes ? body.likes : 0

	const blog = new Blog(body)

	const result = await blog.save()
	response.status(201).json(result)
})

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body

	const result = await Blog.findByIdAndUpdate(request.params.id, body, {new: true})
	response.status(200).json(result)
})

module.exports = blogsRouter