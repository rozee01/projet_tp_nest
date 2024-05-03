import { SoftDelete } from 'src/common/database/softdelete.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Announcement extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /*@Column()
  class_id: string;*/

    @Column({ length: 255 })
    title: string;

    @Column('text')
    content: string;

    /*@ManyToOne(() => Class, { eager: true }) // Assuming a Many-to-One relationship with the Class entity
  @JoinColumn({ name: 'class_id' })
  class: Class;*/
}
