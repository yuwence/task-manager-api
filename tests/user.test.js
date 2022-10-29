const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/user")
const { userOneId, userOne, setupDatabase} = require("./fixtures/db")

beforeEach(setupDatabase)


test("Shoul singup a new user", async() => {
    const response = await request(app).post("/users").send({
        name: "Wei",
        email: "weiwang@gmail.com",
        password: "xrl010203"
    }).expect(201)

    // Asser that database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: "Wei",
            email: "weiwang@gmail.com"
        },
        token: user.tokens[0].token
    })
})

test("Should login existing user", async () => {
    const response = await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test("Should not login noexistent user", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: "failiur"
    }).expect(400|500)
})

test("Should get profile for user", async () => {
    await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test("Should get profile for user", async () => {
    await request(app)
    .get("/users/me")
    .send()
    .expect(401)
})

test("Should delete account for user", async () => {
    await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull
})

test("Should get profile for user", async () => {
    await request(app)
    .get("/users/me")
    .send()
    .expect(401||500)
})

test("Should upload avatar image", async () => {
    await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200)
    const user = await User.findById(userOne)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update valid user fields", async () => {
    await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: "Jess"
    })
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual("Jess")
})

test("Should not update invalid user fields", async () => {
    await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: "China"
    })
    .expect(400||500)
})