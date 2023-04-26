import { Request, Response } from "express";
import { LoginService } from "./LoginService";
import { z } from "zod";

export class LoginController {
  async login(request: Request, response: Response) {
    const loginSchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    const login = await new LoginService().login(
      loginSchema.parse({
        email: request.body.email,
        password: request.body.password,
      })
    );
    return response.status(200).json(login);
  }
}
