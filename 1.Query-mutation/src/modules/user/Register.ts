import { Resolver, Query, Mutation, Arg, FieldResolver, Root} from "type-graphql";
import {User} from "../../entity/User"
import bcrypt from 'bcryptjs'; 
import { RegisterInput } from "./register/RegisterInput";
@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello Word??!"
  }

  @FieldResolver()
  async name(@Root() parent:User){
    return `${parent.firstName} ${parent.lastName}`;
  }
  @Mutation(() => User)
  async register(@Arg("data"){
    firstName,
    lastName,
    email,
    password
  }:RegisterInput,

  ):Promise<User>
  {
    const hashedPassword = await bcrypt.hash(password,12)  
    const user = await User.create(
    {
      firstName,
      lastName,
      email,
      password:hashedPassword
    }).save();

    return user;

  }
}