import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

import { SoftDelete } from 'src/common/database/softdelete.entity';
import { BadRequestException } from '@nestjs/common';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { Class } from 'src/class/entities/class.entity';
import { LevelEnum } from 'src/common/enum/level.enum';

@Entity()
export class Student extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: LevelEnum,
        default: LevelEnum.MPI,
        nullable: false,
    })
    level: LevelEnum;

    @OneToOne(() => User)
    @JoinColumn({ name: 'id', foreignKeyConstraintName: 'student_user_id' })
    user: User;

    @ManyToMany(() => Class, (Class) => Class.students)
    classes: Class[];

    @BeforeInsert()
    @BeforeUpdate()
    validateUserRole(): void {
        if (this.user && this.user.role !== RoleEnum.STUDENT) {
            throw new BadRequestException('User must have the student role to be assigned as a student');
        }
    }
}
