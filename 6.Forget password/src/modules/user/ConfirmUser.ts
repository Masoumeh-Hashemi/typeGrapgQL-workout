import { Resolver, Mutation, Arg, Ctx} from "type-graphql";
import {User} from "../../entity/User"

import { redis } from "../../../src/redis";

@Resolver(User)
export class ConfirmUserResolver {

  @Mutation(() => Boolean )
  async confirmUser(
    @Arg("token") token: string ):Promise<boolean>{
    const userId = await redis.get(token);

    if (!userId){
        return false;
    }
  
    await User.update({ id: parseInt(userId, 10)}, {confirmed: true});
    await redis.del(token);
    return true
  }

 
}