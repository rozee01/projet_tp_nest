import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SoftDelete } from 'src/common/database/softdelete.entity';
import { Class } from 'src/class/entities/class.entity';
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

    @ManyToOne(() => Class, (classs) => classs.posts)
    class : Class;


    /* @Column()
    author:User;*/
}
