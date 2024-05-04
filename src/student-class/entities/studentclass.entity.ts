import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { SoftDelete } from 'src/common/database/softdelete.entity';

@Entity()
export class StudentClass extends SoftDelete {
    @PrimaryColumn()
    student_id: string;

    @ManyToOne(() => Student, (student) => student.studentClasses, { onDelete: 'CASCADE' })
    student: Student;

    @PrimaryColumn()
    class_id: string;

    @ManyToOne(() => Class, (classEntity) => classEntity.studentClasses, { onDelete: 'CASCADE' })
    class: Class;
}
