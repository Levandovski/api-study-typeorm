import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";

const routes = Router();

routes.post("/user", new UserController().create);
routes.post("/login", new LoginController().create);
routes.post("/subject", new SubjectController().create);
routes.post("/room", new RoomController().create);
routes.get("/room", new RoomController().list);
routes.post("/room/:idRoom/create", new RoomController().createVideo);
routes.post("/room/:idRoom/subject", new RoomController().roomSubject);

export default routes;
