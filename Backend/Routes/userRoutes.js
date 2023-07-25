import { CreateUser, GetUsers, login, UpdateUser } from "../Controllers/userController.js";
import VerifyToken from "../utils/VerifyToken.js";

const UserRoutes = (app) => {
    app.route("/users")
    .get(GetUsers)
    app.route("/register")
    .post(CreateUser)
    app.route("/login")
    .post(login)
    app.route("/user")
    .put(VerifyToken, UpdateUser)
  
}

export default UserRoutes;