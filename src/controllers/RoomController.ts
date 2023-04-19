import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { subjectRepository } from "../repositories/subjectRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";

export class RoomController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    const newRoom = roomRepository.create({ name, description });

    await roomRepository.save(newRoom);

    return response.status(201).json(newRoom);
  }

  async createVideo(request: Request, response: Response) {
    const { title, url } = request.body;
    const { idRoom } = request.params;

    const room = await roomRepository.findOneBy({ id: Number(idRoom) });

    if (!room) throw new BadRequestError("Aula não existe");

    const newVideo = videoRepository.create({
      title,
      url,
      room,
    });

    await videoRepository.save(newVideo);

    return response.status(201).json(newVideo);
  }

  async roomSubject(request: Request, response: Response) {
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
