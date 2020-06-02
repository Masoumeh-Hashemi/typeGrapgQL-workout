import { Resolver, Mutation, Arg} from "type-graphql";
import {User} from "../../entity/User"
import bcrypt from 'bcryptjs'; 
@Resolver(User)
export class LoginResolver {

  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx:MyContext

  ):Promise<User | null>{
    const hashedPassword = await bcrypt.hash(password,12)  
    const user = await User.findOne({ where: {email}  });

      if (!user){
        return null
      }

      const valid = await bcrypt.compare(password,user.password);

      if (!valid){
        return null
      }
      return user;

  }
}