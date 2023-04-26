import { BadRequestError } from "../../helpers/api-errors";
import { UserRepository } from "./userRepository";
import bcrypt from "bcrypt";

interface ICreate {
  name: string;
  email: string;
  password: string;
}

interface IGetProfile {
  id?: number;
  name?: string;
  email?: string;
}

export class UserService {
  async create(data: ICreate) {
    const { name, email, password } = data;

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

    return user;
  }

  async getProfile(data: IGetProfile) {
    const { id, name, email } = data;

    return {
      id,
      name,
      email,
    };
  }
}
