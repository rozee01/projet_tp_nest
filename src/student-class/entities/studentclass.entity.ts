import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Class } from 'src/class/entities/class.entity';
@Entity()
export class StudentClass {
    @PrimaryColumn()
    student_id: string;

    @ManyToOne(() => User, user => user.studentClasses)
    student: User;

    @PrimaryColumn( )
    class_id: string;

    @ManyToOne(() => Class, classEntity => classEntity.studentClasses)
    class: Class;


}
