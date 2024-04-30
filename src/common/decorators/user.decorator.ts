import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/*
 *   Instead of using the @Req() decorator and retrieving user from the request object each time
 *   we use a decorator @User() that retrieves user directly for us.
 *   This is less verbose and more elegant.
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user;
});
