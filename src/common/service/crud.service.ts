import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { HasId } from '../interfaces/hasId.interface';

@Injectable()
export class CrudService<Entity extends HasId> {
    constructor(private readonly repository: Repository<Entity>) {}

    create(entity: DeepPartial<Entity>): Promise<Entity> {
        return this.repository.save(entity);
    }

    async update(id: string, updateDto: DeepPartial<Entity>): Promise<Entity> {
        const entity = await this.repository.preload({
            id,
            ...updateDto,
        });
        if (!entity) {
            throw new NotFoundException('entity Not Found');
        }
        return this.repository.save(entity);
    }

    async remove(id: string): Promise<UpdateResult> {
        const result = await this.repository.softDelete(id);
        if (!result.affected) {
            throw new NotFoundException('entity Not Found');
        }
        return result;
    }

    async restore(id: string): Promise<UpdateResult> {
        const result = await this.repository.restore(id);
        if (!result.affected) {
            throw new NotFoundException('entity Not Found');
        }
        return result;
    }

    findAll(): Promise<Entity[]> {
        return this.repository.find();
    }

    findOne(id): Promise<Entity> {
        const result = this.repository.findOneBy({ id });
        if (!result) {
            throw new HttpException('entity Not Found', 404);
        }
        return result;
    }
}
