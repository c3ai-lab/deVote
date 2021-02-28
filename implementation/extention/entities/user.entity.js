class User {
    constructor(username, token, admin) {
        this.username = username;
        this.token = token;
        this.admin = admin;
    }

    setUsername(username) {
        this.username = username;
    }

    getUsername() {
        return this.username;
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    setAdmin(admin) {
        this.admin = admin;
    }

    getAdmin() {
        return this.admin;
    }
}