import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { StudentClass } from 'src/student-class/entities/studentclass.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { SoftDelete } from 'src/common/database/softdelete.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Class extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    class_name: string;
    
    @OneToMany(()=>Post,(post)=>post.className)
    posts:Post[];

    @OneToMany(() => StudentClass, (studentClass) => studentClass.class)
    studentClasses: StudentClass[];

    @ManyToOne(() => Teacher, (teacher) => teacher.classesTaught, { onDelete: 'SET NULL' })
    teacher: Teacher; // Set to null if Teacher is deleted
}
