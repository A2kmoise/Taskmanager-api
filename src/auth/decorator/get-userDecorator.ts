import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "@nestjs/common";
import { User } from "src/user/user.entity";


interface AuthenticatedRequest extends Request {
   user?: User;
}

export const GetUser = createParamDecorator(
 (data: string , ctx: ExecutionContext) =>{
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
   return data ? request.user?.[data] : request.user
 }
);