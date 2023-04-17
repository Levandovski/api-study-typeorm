import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";

export class RoomController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      const newRoom = roomRepository.create({ name, description });

      await roomRepository.save(newRoom);

      return response.status(201).json(newRoom);
    } catch (error) {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createVideo(request: Request, response: Response) {
    const { title, url } = request.body;
    const { idRoom } = request.params;


    try {
        const room = await roomRepository.findOneBy({id: Number(idRoom)});

        if(!room)
            return response.status(404).json({message: 'Aula não existe'})
       

        const newVideo = videoRepository.create({
            title,
            url,
            room
        })

        await videoRepository.save(newVideo);

        return response.status(201).json(newVideo);

    } catch (error) {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
}
