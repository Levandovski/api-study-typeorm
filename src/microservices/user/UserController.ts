import { Request, Response } from "express";
import { UserService } from "./UserService";
import { z } from "zod";

export class UserController {
  async create(request: Request, response: Response) {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const user = await new UserService().create(
      createUserSchema.parse({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      })
    );
    return response.status(201).json(user);
  }

  async getProfile(request: Request, response: Response) {
    const getProfileSchema = z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    });

    const user = await new UserService().getProfile(
      getProfileSchema.parse({
        id: Number(request.user.id),
        name: request.user.name,
        email: request.user.email,
      })
    );
    return response.json(user);
  }
}
