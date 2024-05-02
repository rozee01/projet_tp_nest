import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    url: string;
    @Column()
    nom: string;
    @ManyToOne(() => Post, (post) => post.files, { eager: true })
    post: Post;
}
