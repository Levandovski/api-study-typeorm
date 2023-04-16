import { Request, Response } from "express";

import { z } from "zod";
import { subjectRepository } from "../repositories/subjectRepository";

export class SubjectController {
  async create(request: Request, response: Response) {
    const createSubjectSchema = z.object({
      name: z.string(),
    });
    const { name } = createSubjectSchema.parse(request.body);

    if (!name)
      return response.status(400).json({ message: "O nome é obrigatório" });

    try {
      const newSubject =  subjectRepository.create({ name });

      await subjectRepository.save(newSubject);

      return response.status(201).json(newSubject);

      console.log(newSubject);
    } catch (error) {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
}
