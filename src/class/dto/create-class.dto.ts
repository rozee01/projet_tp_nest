import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { LevelEnum } from 'src/common/enum/level.enum';

export class CreateClassDto {
    @IsNotEmpty()
    @IsString()
    class_name: string;

    @IsString()
    description: string;

    @IsEnum(LevelEnum)
    level: LevelEnum;
}
