import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends CrudService<User>{
        constructor(
            @InjectRepository(User)
            private userRepository : Repository<User>,

        )
        { super(userRepository)}
}
