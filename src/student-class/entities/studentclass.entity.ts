import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
@Entity()
export class StudentClass {
    @PrimaryColumn()
    student_id: string;

    @ManyToOne(() => Student, student => student.studentClasses)
    student: Student;

    @PrimaryColumn( )
    class_id: string;

    @ManyToOne(() => Class, classEntity => classEntity.studentClasses)
    class: Class;


}
