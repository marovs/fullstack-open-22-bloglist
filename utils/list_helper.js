const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (accumulator, currentValue) => {
		return accumulator + currentValue.likes
	}

	return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const maxLikes = Math.max(...blogs.map(blog => blog.likes))
	const blog = blogs.find(blog => blog.likes === maxLikes)
	return blog ? {"title": blog.title, "author": blog.author, "likes": blog.likes} : undefined
}

const mostBlogs = (blogs) => {
	const blogsPerAuthor = blogs.reduce((acc, curr) => {
		return acc[curr.author] ? ++acc[curr.author] : acc[curr.author] = 1, acc
	}, {})
	const maxBlogs = Math.max(...Object.values(blogsPerAuthor))
	const maxAuthor = Object.keys(blogsPerAuthor).find(author => blogsPerAuthor[author] === maxBlogs)

	return maxAuthor ? {author: maxAuthor, blogs: maxBlogs} : undefined
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}