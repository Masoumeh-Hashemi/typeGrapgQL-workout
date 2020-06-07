import { Resolver, Query, Mutation, Arg, FieldResolver, Root, /*Authorized,*/ UseMiddleware} from "type-graphql";
import {User} from "../../entity/User"
import bcrypt from 'bcryptjs'; 
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmtionUrl";
@Resolver(User)
export class RegisterResolver {
  // @Authorized()
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return "Hello you are logged in"
  }

  @FieldResolver()
  async name(@Root() parent:User){
    return `${parent.firstName} ${parent.lastName}`;
  }
  @Mutation(() => User)
  async register(@Arg("data"){
    email,
    firstName,
    lastName,
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

    await sendEmail(email,await createConfirmationUrl(user.id));
    return user;

  }
}