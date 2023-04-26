import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";

import { subjectRepository } from "../repositories/subjectRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { RoomService } from "../services/RoomService";

export class RoomController {
  async create(request: Request, response: Response) {
    const room = await new RoomService().create(request.body);
    return response.status(201).json(room);
  }

  async createVideo(request: Request, response: Response) {
    const video = await new RoomService().createVideo({
      ...request.body,
      ...request.params,
    });
    return response.status(201).json(video);
  }

  async roomSubject(request: Request, response: Response) {
    //Begin

    //End
    const { subject_id } = request.body;
    const { idRoom } = request.params;

    const room = await roomRepository.findOneBy({ id: Number(idRoom) });

    if (!room) throw new NotFoundError("Aula não existe");

    const subject = await subjectRepository.findOneBy({
      id: Number(subject_id),
    });

    if (!subject) throw new NotFoundError("Disciplina não existe");

    const roomUpdate = {
      ...room,
      subjects: [subject],
    };

    await roomRepository.save(roomUpdate);

    return response.status(200).send();
  }

  async list(request: Request, response: Response) {
    const rooms = await roomRepository.find({
      relations: {
        subjects: true,
        videos: true,
      },
    });
    return response.json(rooms);
  }
}
