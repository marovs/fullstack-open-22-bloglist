const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const {userExtractor} = require("../utils/middleware")


blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog
		.find({}).populate("user", {blogs: 0})
	response.json(blogs)
})

blogsRouter.post("/", userExtractor, async (request, response) => {
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

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	const user = request.user

	if (blog.user.toString() === user._id.toString()) {
		await Blog.deleteOne(blog)
		response.status(204).end()
	} else {
		response.status(401).json({error: "unauthorized user"})
	}
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