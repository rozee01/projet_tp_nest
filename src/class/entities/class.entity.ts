/* eslint-disable prettier/prettier */
import { Timestamp } from "../../common/database/timestamp.entity";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Class extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable : false })
  class_name: string;

  //@Column({nullable: false })
  //teacher_id: number;
}
