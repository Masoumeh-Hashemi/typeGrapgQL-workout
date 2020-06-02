import { ApolloServer} from "apollo-server-express";
import Express from "express";
import { buildSchema} from "type-graphql";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";

// @Resolver()
// class HelloResolver {
//   @Query(() => String)
//   async hello() {
//     return "Hello Word!"
//   }
// }


// @Resolver()
// class ByeResolver {
//   @Query(() => String)
//   async bye() {
//     return "Bye Word!"
//   }
// }

const main = async ()=>{

    await createConnection();
    const schema = await buildSchema({
        // resolvers: [HelloResolver,ByeResolver],
        resolvers:[RegisterResolver]
      });
    const apolloServer = new ApolloServer({schema});
    const app = Express();
    apolloServer.applyMiddleware({app})
    app.listen(4000,()=> {
        console.log('Hi i"m listening');
    })
};

main();