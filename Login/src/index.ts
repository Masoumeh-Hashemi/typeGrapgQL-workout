import { ApolloServer} from "apollo-server-express";
import Express from "express";
import { buildSchema, formatArgumentValidationError} from "type-graphql";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import connectRedis from "connect-redis";
import session from 'express-session'; 
import { redis } from "./redis";
import cors from 'cors';
import { LoginResolver } from "./modules/user/Login";
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
        resolvers:[RegisterResolver,LoginResolver]
      });
    const apolloServer = new ApolloServer({
        schema, 
        formatError: formatArgumentValidationError,
        context: ({req}:any) => ({req})
    });
    const app = Express();

    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials:true,
            origin:"http://localhost:3000"
        })
    );

    app.use(
        session({
        store: new RedisStore({
            client: redis as any
            
        }),
        name: "qid",
        secret: "123456",
        resave:false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000* 60 * 60 * 24 * 7 * 365,
            }
        })
    );

    apolloServer.applyMiddleware({app})

    app.listen(4000,()=> {
        console.log('Hi i"m listening');
    });
};

main();