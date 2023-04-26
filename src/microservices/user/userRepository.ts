import { AppDataSource } from "../../data-source";
import { User } from "../../typeorm/entities/User";

export const UserRepository = AppDataSource.getRepository(User);
