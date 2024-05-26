import { IsEnum } from 'class-validator';
import { SignUpDTO } from './signup.dto';
import { LevelEnum } from 'src/common/enum/level.enum';
export class StudentSignUpDTO extends SignUpDTO {
    @IsEnum(LevelEnum)
    level: LevelEnum;
}
