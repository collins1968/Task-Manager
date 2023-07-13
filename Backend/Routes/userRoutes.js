import { CreateUser, GetUsers, login } from "../Controllers/userController.js";

const UserRoutes = (app) => {
    app.route("/users")
    .get(GetUsers)
    app.route("/register")
    .post(CreateUser)
    app.route("/login")
    .post(login)
  
}

export default UserRoutes;