import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { MyContext } from "src/types/MyContext";


export const isAuth: MiddlewareFn<MyContext> = async ({context} , next) =>
{
    if (!context.req.session!.userId){
        throw new Error("you are not authenticated");
    }

    return next();
}