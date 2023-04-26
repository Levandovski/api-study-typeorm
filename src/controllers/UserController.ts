import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  async create(request: Request, response: Response) {
    const user = await new UserService().create(request.body);
    return response.status(201).json(user);
  }

  async getProfile(request: Request, response: Response) {
    const user = await new UserService().getProfile(request.user);
    return response.json(user);
  }
}
