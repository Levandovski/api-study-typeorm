import { Request, Response } from "express";
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
    const room = await new RoomService().roomSubject({
      ...request.body,
      ...request.params,
    });

    return response.status(200).send();
  }

  async list(request: Request, response: Response) {
    const listRooms = await new RoomService().list();

    return response.status(200).json(listRooms);
  }
}
