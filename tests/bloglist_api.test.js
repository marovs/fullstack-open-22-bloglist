const mongoose = require("mongoose").default
const supertest = require("supertest")
const helper = require("./test_helper")
const Blog = require("../models/blog")
const app = require("../app")
const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

describe("when calling http get on /api/blogs,", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/)
	})

	test("all blogs are returned", async () => {
		const response = await api.get("/api/blogs")

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test("unique identifier is named id", async () => {
		const response = await api.get("/api/blogs")

		response.body.map(blog => {
			expect(blog.id).toBeDefined()
		})
	})
})

describe("when calling http post on /api/blogs", () => {
	test("successfully creates a new blog", async () => {
		const newBlog = {
			title: "New Blog",
			author: "Person",
			url: "https://place.com",
			likes: 0,
		}

		await api.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const response = await api.get("/api/blogs")

		const blogs = response.body.map(b => b.title)

		expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
		expect(blogs).toContain(
			"New Blog"
		)
	})

	test("if missing likes defaults to 0", async () => {
		const newBlog = {
			title: "New Blog",
			author: "Person",
			url: "https://place.com",
		}

		const response = await api.post("/api/blogs").send(newBlog)

		expect(response.body.likes).toEqual(0)
	})

	test("if missing title responds with 400", async () => {
		const newBlog = {
			author: "Person",
			url: "https://place.com",
			likes: 0,
		}

		await api.post("/api/blogs")
			.send(newBlog)
			.expect(400)
	})

	test("if missing url responds with 400", async () => {
		const newBlog = {
			title: "New Blog",
			author: "Person",
			likes: 0,
		}

		await api.post("/api/blogs")
			.send(newBlog)
			.expect(400)
	})
})

describe("when calling http delete on /api/blogs/:id", () => {
	test("successfully removes blog", async () => {
		const initialBlogs = await helper.blogsInDb()
		const blogToDelete = initialBlogs[0]

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

		const blogsAfter = await helper.blogsInDb()

		expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)

		const titles = blogsAfter.map(b => b.title)

		expect(titles).not.toContain(blogToDelete.title)
	})
})

describe("when calling http put on /api/blogs/:id", () => {
	test("successfully updates blog", async () => {
		const initialBlogs = await helper.blogsInDb()
		const blogToUpdate = initialBlogs[0]

		const updatedBlog = {...blogToUpdate, likes: 42}

		await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog)
			.expect(200)

		const response = await helper.blogsInDb()
		const responseBlog = response.find(blog => blog.id === blogToUpdate.id)
		expect(response).toHaveLength(helper.initialBlogs.length)
		expect(responseBlog.likes).toEqual(42)
	})
})


afterAll(async () => {
	await mongoose.connection.close()
})