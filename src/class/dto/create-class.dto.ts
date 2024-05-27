import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
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
