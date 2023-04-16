import { Router } from "express";
import { SubjectController } from "./controllers/SubjectControllers";

const routes = Router();

routes.post("/subject", new SubjectController().create);

export default routes;
