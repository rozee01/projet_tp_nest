import { SoftDelete } from 'src/common/database/softdelete.entity';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
