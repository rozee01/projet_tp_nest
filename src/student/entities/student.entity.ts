import { BeforeInsert, BeforeUpdate, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { StudentClass } from 'src/student-class/entities/studentclass.entity';
import { SoftDelete } from 'src/common/database/softdelete.entity';
import { BadRequestException } from '@nestjs/common';
import { RoleEnum } from 'src/common/enum/roles.enum';

@Entity()
export class Student extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'id' })
    user: User;

    @OneToMany(() => StudentClass, (studentClass) => studentClass.student)
    studentClasses: StudentClass[];

    @BeforeInsert()
    @BeforeUpdate()
    validateUserRole(): void {
        if (this.user && this.user.role !== RoleEnum.STUDENT) {
            throw new BadRequestException('User must have the student role to be assigned as a student');
        }
    }
}
