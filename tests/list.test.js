const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
]

describe("total likes", () => {
	test("of empty list is 0", () => {
		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})

	test("of list with one element is likes of that element", () => {
		const result = listHelper.totalLikes([blogs[0]])
		expect(result).toBe(blogs[0].likes)
	})

	test("of a list with more than one element returns sum of likes", () => {
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(7 + 5 + 12 + 10 + 2)
	})
})

describe("favorite blog", () => {
	test("of empty list is undefined", () => {
		const result = listHelper.favoriteBlog([])
		expect(result).toBeUndefined()
	})

	test("of list with one element is element", () => {
		const result = listHelper.favoriteBlog([blogs[0]])
		expect(result).toEqual({
			title: "React patterns",
			author: "Michael Chan",
			likes: 7
		})
	})

	test("of a list with more than one element returns element with most likes", () => {
		const result = listHelper.favoriteBlog(blogs)
		expect(result).toEqual({
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12
		})
	})
})

describe("author of most blogs", () => {
	test("when empty list is undefined", () => {
		const result = listHelper.mostBlogs([])
		expect(result).toBeUndefined()
	})

	test("when list contains one element is author of element", () => {
		const result = listHelper.mostBlogs([blogs[0]])
		expect(result).toEqual({
			author: "Michael Chan",
			blogs: 1
		})
	})

	test("when list of more elements is author with most blogs", () => {
		const result = listHelper.mostBlogs(blogs)
		expect(result).toEqual({
			author: "Robert C. Martin",
			blogs: 3
		})
	})
})

describe("author of most likes", () => {
	test("when empty list is undefined", () => {
		const result = listHelper.mostLikes([])
		expect(result).toBeUndefined()
	})

	test("when list contains one element is author of element", () => {
		const result = listHelper.mostLikes([blogs[0]])
		expect(result).toEqual({
			author: "Michael Chan",
			likes: 7
		})
	})

	test("when list of more elements is author with most likes", () => {
		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual({
			author: "Edsger W. Dijkstra",
			likes: 17
		})
	})
})