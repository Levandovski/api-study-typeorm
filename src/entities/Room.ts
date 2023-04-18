import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Video } from "./Video";
import { Subject } from "./Subject";

@Entity("rooms")
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  //Ao cadastrar algo aqui ele ja faz a ligação automatica na tabela associativa de subject juntando a config criada
  @OneToMany(() => Video, (video) => video.room)
  videos: Video[];

  @ManyToMany(() => Subject, (subject) => subject.rooms)
  subjects: Subject[];
}
