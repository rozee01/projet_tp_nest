/* eslint-disable prettier/prettier */
import { User } from "src/user/entities/user.entity";
import { Timestamp } from "../../common/database/timestamp.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { StudentClass } from "src/student-class/entities/studentclass.entity";

@Entity()
export class Class extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable : false })
  class_name: string;
  
  @ManyToOne(() => User, user => user.classesTaught)
    @JoinColumn({ name: 'teacher_id' })
    teacher: User;

  @OneToMany(() => StudentClass, studentClass => studentClass.class)
   studentClasses: StudentClass[];
}