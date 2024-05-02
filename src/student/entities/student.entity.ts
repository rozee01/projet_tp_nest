import { Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { StudentClass } from 'src/student-class/entities/studentclass.entity';

@Entity()
export class Student extends User {
    @OneToMany(() => StudentClass, studentClass => studentClass.student)
    studentClasses: StudentClass[];
    
}
