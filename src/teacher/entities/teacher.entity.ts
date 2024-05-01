/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RoleEnum } from 'src/common/enum/roles.enum'; // Import RoleEnum
import { Class } from 'src/class/entities/class.entity';

@Entity()
export class Teacher extends User {
    
    @OneToMany(() => Class, classEntity => classEntity.teacher)
    classesTaught: Class[];

    constructor() {
        super();
    
        this.role = RoleEnum.TEACHER;
      }


  // You can add additional fields specific to the Teacher entity here
}
