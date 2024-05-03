import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';

/*
 *   Instead of using the @Req() decorator and retrieving user from the request object each time
 *   we use a decorator @User() that retrieves user directly for us.
 *   This is less verbose and more elegant.
 */
export const UserDecorator = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): JwtPayloadDto | undefined => {
        return ctx.switchToHttp().getRequest().user;
    },
);
