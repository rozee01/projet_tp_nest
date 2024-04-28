import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';

@Entity()
export class Subject extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne((type) => Teacher, teacher => teacher.subjects)
  teacher: Teacher;
}

