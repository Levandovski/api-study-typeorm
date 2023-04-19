import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-errors";
import bcrypt from "bcrypt";

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userExists = await UserRepository.findOneBy({ email });

    if (userExists) throw new BadRequestError("E-mail já existe");

    const hashPassword = await bcrypt.hash(password, 10);

    //Cria um objeto do tipo usuario
    const newUser = UserRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await UserRepository.save(newUser);

    const { password: _, ...user } = newUser;

    response.status(201).json(user);
  }
}
