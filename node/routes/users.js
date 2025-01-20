import { UsersController } from "../controllers/users.js";
import { Router } from "express";
const usersRouter = Router();

usersRouter.get("/", UsersController.getAllUsers)

usersRouter.get("/id/:id", UsersController.getUserById)

usersRouter.get("/username/:username", UsersController.getUserByUsername)

usersRouter.post("/", UsersController.createUser)

// usersRouter.put("/:id", UsersController.updateUser)

// usersRouter.delete("/:id", UsersController.deleteUser)

export default usersRouter