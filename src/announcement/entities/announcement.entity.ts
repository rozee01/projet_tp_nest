import { Timestamp } from 'src/common/database/timestamp.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
//import { Class } from './Class.entity'; // Assuming you have a Class entity defined

@Entity()
export class Announcement extends Timestamp{

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

