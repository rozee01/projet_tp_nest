import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { SoftDelete } from 'src/common/database/softdelete.entity';
@Entity()
export class Post extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    content: string;
    @OneToMany(() => File, (files) => files.post, { cascade: true })
    files: File[];

    /* @Column()
    author:User;*/
}
