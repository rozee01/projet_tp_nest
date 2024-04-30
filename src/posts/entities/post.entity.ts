import { Timestamp } from 'src/common/database/timestamp.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Files } from './file.entity';
@Entity()
export class Post extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    content: string;
    @OneToMany((type) => Files, (files) => files.post, { cascade: true })
    files: Files[];

    /* @Column()
    author:User;*/
}
