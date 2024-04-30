import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/service/crud.service';

@Injectable()
export class UsersService extends CrudService<User> {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  async findOnebyEmail(email: string):Promise<User>|null {
    return await this.userRepository.findOneBy({email});
}
}
