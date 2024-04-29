

import { Class } from "src/class/entities/class.entity";
import { Timestamp } from "src/common/database/timestamp.entity";
import { StudentClass } from "src/student-class/entities/studentclass.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    STUDENT = "student",
    TEACHER = "teacher"
}

@Entity()
export class User extends Timestamp {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    password: string;
    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.STUDENT
    })
    role: UserRole;

    @OneToMany(() => Class, classEntity => classEntity.teacher)
    classesTaught: Class[];
    
    @OneToMany(() => StudentClass, studentClass => studentClass.student)
    studentClasses: StudentClass[];
}