import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { Teacher } from 'src/teacher/entities/teacher.entity';
import { SoftDelete } from 'src/common/database/softdelete.entity';
import { Student } from 'src/student/entities/student.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Class extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    class_name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Post, (post) => post.className)
    posts: Post[];

    @ManyToMany(() => Student, (student) => student.classes, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinTable({
        name: 'student_class',
        joinColumn: {
            name: 'student_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'class_id',
            referencedColumnName: 'id',
        },
    })
    students: Student[];

    @ManyToOne(() => Teacher, (teacher) => teacher.classesTaught, { onDelete: 'SET NULL' })
    teacher: Teacher; // Set to null if Teacher is deleted
}
