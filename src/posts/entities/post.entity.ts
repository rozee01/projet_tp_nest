import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SoftDelete } from 'src/common/database/softdelete.entity';
@Entity()
export class Post extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    content: string;
    
    //files: list of files seperated by a comma ',';
    @Column({ type: 'text', default: '' })
    files: string;

    /* @Column()
    author:User;*/
}
