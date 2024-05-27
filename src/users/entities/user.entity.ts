import { SoftDelete } from 'src/common/database/softdelete.entity';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@Index(['email'], { unique: true }) // Ensures quick look-up and uniqueness of email
export class User extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.STUDENT,
        nullable: false,
    })
    role: RoleEnum;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    salt: string;
}
