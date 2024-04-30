import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
@Entity()
export class Files {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    url: string;
    @ManyToOne(() => Post, (post) => post.files, { eager: true })
    post: Post;
}
