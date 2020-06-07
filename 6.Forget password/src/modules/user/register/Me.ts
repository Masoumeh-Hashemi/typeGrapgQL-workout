import { Resolver, Query, Mutation, Arg, FieldResolver, Root, Ctx} from "type-graphql";
import {User} from "../../../entity/User"

import { MyContext } from "../../../types/MyContext";
@Resolver(User)
export class MeResolver {
  @Query(() => User ,{nullable: true})
  async Me(@Ctx() ctx: MyContext): Promise<User | undefined >{
    if (!ctx.req.session!.userId) {
        return undefined;
    } 
    return User.findOne(ctx.req.session!.userId);
  }

}