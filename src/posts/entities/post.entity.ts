import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { SoftDelete } from 'src/common/database/softdelete.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
@Entity()
export class Post extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    content: string;
    // @OneToMany(() => File, (files) => files.post, { cascade: true })
    // files: File[];

    //files: string[];
    @Column({ type: 'text', default: '' })
    files: string;
    @ManyToOne(()=>Teacher, (teacher)=>teacher.posts, {onDelete: 'CASCADE'})
    @Column()
    author:Teacher;
}
