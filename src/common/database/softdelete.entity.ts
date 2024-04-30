import { Column } from 'typeorm';
import { Timestamp } from './timestamp.entity';

export class SoftDelete extends Timestamp {
  @Column({ default: false })
  isDeleted: boolean;
}
