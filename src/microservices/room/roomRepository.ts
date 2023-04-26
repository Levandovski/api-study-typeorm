import { AppDataSource } from "../../data-source";
import { Room } from "../../typeorm/entities/Room";

export const roomRepository = AppDataSource.getRepository(Room);
