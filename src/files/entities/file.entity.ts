import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { SoftDelete } from 'src/common/database/softdelete.entity';
@Entity()
export class File extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    url: string;
    @Column()
    nom: string;
    @ManyToOne(() => Post, (post) => post.files, { eager: true })
    post: Post;
}
