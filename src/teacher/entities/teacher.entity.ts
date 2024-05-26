import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RoleEnum } from 'src/common/enum/roles.enum'; // Import RoleEnum
import { Class } from 'src/class/entities/class.entity';
import { SoftDelete } from 'src/common/database/softdelete.entity';
import { BadRequestException } from '@nestjs/common';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Teacher extends SoftDelete {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'id' })
    user: User;

    @OneToMany(() => Class, (classEntity) => classEntity.teacher)
    classesTaught: Class[];

    @BeforeInsert()
    @BeforeUpdate()
    validateUserRole(): void {
        if (this.user && this.user.role !== RoleEnum.TEACHER) {
            throw new BadRequestException('User must have the teacher role to be assigned as a teacher');
        }
    }
    @OneToMany(()=>Post, (post)=>post.author, {onDelete: 'CASCADE'})
    posts:Post[];
}
