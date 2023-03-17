import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Authentication = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.header.authentication;
});
