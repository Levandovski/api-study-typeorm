import { Request, Response } from "express";

import { z } from "zod";

import { SubjectServices } from "../services/SubjectService";

export class SubjectController {
  async create(request: Request, response: Response) {
    const createSubjectSchema = z.object({
      name: z.string(),
    });

    const subject = await new SubjectServices().create(
      createSubjectSchema.parse(request.body)
    );

    return response.status(201).json(subject);
  }
}
