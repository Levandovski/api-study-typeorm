import { Request, Response } from "express";
import { RoomService } from "./RoomService";
import { z } from "zod";

export class RoomController {
  async create(request: Request, response: Response) {
    const createRoomSchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const room = await new RoomService().create(
      createRoomSchema.parse({
        name: request.body.name,
        description: request.body.description,
      })
    );

    return response.status(201).json(room);
  }

  async createVideo(request: Request, response: Response) {
    const createVideoSchema = z.object({
      title: z.string(),
      url: z.string(),
      idRoom: z.number(),
    });

    const video = await new RoomService().createVideo(
      createVideoSchema.parse({
        title: request.body.title,
        url: request.body.url,
        idRoom: Number(request.params.idRoom),
      })
    );
    return response.status(201).json(video);
  }

  async roomSubject(request: Request, response: Response) {
    const roomSubjectSchema = z.object({
      subject_id: z.number(),
      idRoom: z.number(),
    });

    await new RoomService().roomSubject(
      roomSubjectSchema.parse({
        subject_id: Number(request.body.subject_id),
        idRoom: Number(request.params.idRoom),
      })
    );

    return response.status(200).send();
  }

  async list(request: Request, response: Response) {
    const listRooms = await new RoomService().list();

    return response.status(200).json(listRooms);
  }
}
