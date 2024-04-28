import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Subject } from 'src/subject/entities/subject.entity';

@Entity()
export class Teacher extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    email: string;

    @OneToMany((type) => Subject, subject => subject.teacher, {
        cascade: true, 
    })
    subjects: Subject[];
}
