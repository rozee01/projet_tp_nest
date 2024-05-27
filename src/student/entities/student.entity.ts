import { BeforeInsert, BeforeUpdate, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

import { SoftDelete } from 'src/common/database/softdelete.entity';
import { BadRequestException } from '@nestjs/common';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { Class } from 'src/class/entities/class.entity';

@Entity()
export class Student extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'id' })
    user: User;
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
