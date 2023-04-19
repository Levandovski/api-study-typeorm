import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-errors";

export class LoginController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await UserRepository.findOneBy({ email });

    if (!user) throw new BadRequestError("E-mail ou senha inválidos");

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) throw new BadRequestError("E-mail ou senha inválidos");

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = user;

    return response.json({
      userLogin,
      token: token,
    });

    console.log(token);
  }
}
