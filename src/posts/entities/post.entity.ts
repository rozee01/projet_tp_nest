import { Timestamp } from "src/common/database/timestamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "../../files/entities/file.entity";
@Entity()
export class Post extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    content: string;
    @OneToMany(
        ()=>File,
        (files)=>files.post,
        {cascade:true}
    )
    files: File[];

    /* @Column()
    author:User;*/
}
