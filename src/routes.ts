import { Router } from "express";
import { SubjectController } from "./microservices/subject/SubjectController";
import { RoomController } from "./microservices/room/RoomController";
import { UserController } from "./microservices/user/UserController";
import { LoginController } from "./microservices/login/LoginController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/user", new UserController().create);
routes.post("/login", new LoginController().login);

routes.use(authMiddleware);

routes.get("/profile", new UserController().getProfile);
routes.post("/subject", new SubjectController().create);
routes.post("/room", new RoomController().create);
routes.get("/room", new RoomController().list);
routes.post("/room/:idRoom/create", new RoomController().createVideo);
routes.post("/room/:idRoom/subject", new RoomController().roomSubject);

export default routes;
