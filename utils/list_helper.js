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

const maxValue = (blogs) => {
	const maxValue = Math.max(...Object.values(blogs))
	const maxAuthor = Object.keys(blogs).find(author => blogs[author] === maxValue)

	return [maxValue, maxAuthor]
}

const mostBlogs = (blogs) => {
	const blogsPerAuthor = blogs.reduce((acc, curr) => {
		return acc[curr.author] ? ++acc[curr.author] : acc[curr.author] = 1, acc
	}, {})
	const [maxBlogs, maxAuthor] = maxValue(blogsPerAuthor)

	return maxAuthor ? {author: maxAuthor, blogs: maxBlogs} : undefined
}

const mostLikes = (blogs) => {
	const likesPerAuthor = blogs.reduce((acc, curr) => {
		return acc[curr.author] ? acc[curr.author] += curr.likes : acc[curr.author] = curr.likes, acc
	}, {})
	const [maxLikes, maxAuthor] = maxValue(likesPerAuthor)

	return maxAuthor ? {author: maxAuthor, likes: maxLikes} : undefined
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}