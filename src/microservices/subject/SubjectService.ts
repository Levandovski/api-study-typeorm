import { BadRequestError } from "../../helpers/api-errors";
import { subjectRepository } from "./subjectRepository";

interface ICreate {
  name: string;
}

export class SubjectServices {
  async create(data: ICreate) {
    const { name } = data;

    if (!name) throw new BadRequestError("O nome é obrigatório");

    const newSubject = subjectRepository.create({ name });

    await subjectRepository.save(newSubject);

    return newSubject;
  }
}
