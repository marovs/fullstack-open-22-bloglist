const blogsRouter = require("express").Router()
const Blog = require("../models/blog")


blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog
		.find({}).populate("user", {blogs: 0})
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

	const user = request.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	}

	const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
	response.status(200).json(result)
})

module.exports = blogsRouter