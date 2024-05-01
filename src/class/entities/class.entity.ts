/* eslint-disable prettier/prettier */

import { Timestamp } from "../../common/database/timestamp.entity";
import { Entity, PrimaryGeneratedColumn, Column,  OneToMany, ManyToOne } from 'typeorm';
import { StudentClass } from "src/student-class/entities/studentclass.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";

@Entity()
export class Class extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable : false })
  class_name: string;
  

  @OneToMany(() => StudentClass, studentClass => studentClass.class)
   studentClasses: StudentClass[];
  @ManyToOne(()=> Teacher, teacher => teacher.classesTaught )
  teacher: Teacher
}