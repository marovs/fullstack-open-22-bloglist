const mongoose = require("mongoose").default
const bcrypt = require("bcrypt")
const supertest = require("supertest")
const helper = require("./test_helper")
const User = require("../models/user")
const app = require("../app")
const api = supertest(app)

describe("when there is initially one user in db", () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash("sekret", 10)
		const user = new User({username: "root", passwordHash})

		await user.save()
	})

	test("creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: "test",
			name: "Test User",
			password: "pass1234",
		}

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test("creation fails with non-unique username", async () => {
		const newUser = {
			username: "root",
			name: "Test User",
			password: "pass1234",
		}

		await helper.addUserToDb(newUser, "unique")
	})

	test("creation fails with too short username", async () => {
		const newUser = {
			username: "ro",
			name: "Test User",
			password: "pass1234",
		}

		await helper.addUserToDb(newUser, "short")
	})

	test("creation fails with too short password", async () => {
		const newUser = {
			username: "root",
			name: "Test User",
			password: "1",
		}

		await helper.addUserToDb(newUser, "invalid password")
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})