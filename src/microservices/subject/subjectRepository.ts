import { AppDataSource } from "../../data-source";
import { Subject } from "../../typeorm/entities/Subject";

export const subjectRepository = AppDataSource.getRepository(Subject);
