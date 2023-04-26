import { BadRequestError, NotFoundError } from "../../helpers/api-errors";
import { roomRepository } from "./roomRepository";
import { subjectRepository } from "../subject/subjectRepository";
import { videoRepository } from "./videoRepository";

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

  async roomSubject(data: IRoomSubject) {
    const { idRoom, subject_id } = data;

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

    return;
  }

  async list() {
    const rooms = await roomRepository.find({
      relations: {
        subjects: true,
        videos: true,
      },
    });

    return rooms;
  }
}
