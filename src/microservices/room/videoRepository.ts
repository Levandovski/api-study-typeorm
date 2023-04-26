import { AppDataSource } from "../../data-source";
import { Video } from "../../typeorm/entities/Video";

export const videoRepository = AppDataSource.getRepository(Video);
