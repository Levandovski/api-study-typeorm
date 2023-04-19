import { Request, Response } from "express";

import { z } from "zod";
import { subjectRepository } from "../repositories/subjectRepository";
import { BadRequestError } from "../helpers/api-errors";

export class SubjectController {
  async create(request: Request, response: Response) {
    const createSubjectSchema = z.object({
      name: z.string(),
    });
    const { name } = createSubjectSchema.parse(request.body);

    if (!name) throw new BadRequestError("O nome é obrigatório");

    const newSubject = subjectRepository.create({ name });

    await subjectRepository.save(newSubject);

    return response.status(201).json(newSubject);
  }
}
