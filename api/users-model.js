let lastID = 0
let users = [
    {
        id: 0,
        username: "TEST",
        password: "testPass1234"
    }
]

module.exports = {
    async findAll() {
        return users;
    },

    async create(body) {
        const { username, password } = body
        lastID = lastID + 1

        const newUser = {
            id: lastID,
            username: username,
            password: password,
        }

        users.push(newUser)

        return newUser
    },

    async FindUser({ username, password }) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                if (users[i].password == password) {
                    return true
                }
            }
        }

        return false
    }
}