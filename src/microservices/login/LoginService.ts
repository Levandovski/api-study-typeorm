import { BadRequestError } from "../../helpers/api-errors";
import { UserRepository } from "../user/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface ILogin {
  email: string;
  password: string;
}

export class LoginService {
  async login(data: ILogin) {
    const { email, password } = data;

    const user = await UserRepository.findOneBy({ email });

    if (!user) throw new BadRequestError("E-mail ou senha inválidos");

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) throw new BadRequestError("E-mail ou senha inválidos");

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = user;

    return {
      userLogin,
      token: token,
    };
  }
}
