import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports:[TypeOrmModule.forFeature([File])]

})
export class FilesModule {}
