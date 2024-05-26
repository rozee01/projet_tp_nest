import { Column, Entity,ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SoftDelete } from 'src/common/database/softdelete.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Class } from 'src/class/entities/class.entity';
@Entity()
export class Post extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    content: string;
    @Column({ type: 'text', default: '' })
    files: string;

    @ManyToOne(()=>Class,(className)=>className.posts)
    className:Class;

    @ManyToOne(()=>Teacher, (teacher)=>teacher.posts, {onDelete: 'CASCADE'})
    author:Teacher;
}
