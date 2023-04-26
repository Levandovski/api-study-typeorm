import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

export class LoginController {
  async login(request: Request, response: Response) {
    const login = await new LoginService().login(request.body);
    return response.status(200).json(login);
  }
}
