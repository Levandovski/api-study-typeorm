import { BadRequestError } from "../helpers/api-errors";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";

interface ICreate {
  name: string;
  description?: string;
}

interface ICreateVideo {
  title: string;
  url: string;
  idRoom: number;
}

interface IRoomSubject {
  subject_id: number;
  idRoom: number;
}

export class RoomService {
  async create(data: ICreate) {
    const { name, description } = data;

    const newRoom = roomRepository.create({ name, description });

    await roomRepository.save(newRoom);

    return newRoom;
  }

  async createVideo(data: ICreateVideo) {
    const { title, url, idRoom } = data;

    const room = await roomRepository.findOneBy({ id: Number(idRoom) });

    if (!room) throw new BadRequestError("Aula não existe");

    const newVideo = videoRepository.create({
      title,
      url,
      room,
    });

    await videoRepository.save(newVideo);

    return newVideo;
  }

  async roomSubject(data: IRoomSubject) {}

  async list() {}
}
