import { ApolloServer } from "apollo-server-koa";
import * as path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { MyServer } from "../server";
import { 
  AntennaResolver,
  MetaResolver,
  AnalysisResolver
} from "./resolvers";

export async function setGateway(server: MyServer): Promise<void> {

  const sdlPath = path.resolve(__dirname, "gateway.graphql");
  const schema = await buildSchema({
    resolvers: [AntennaResolver, MetaResolver, AnalysisResolver],
    emitSchemaFile: {
      path: sdlPath,
      commentDescriptions: true,
    },
    validate: false
  });

  const apollo = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: async _ => {
      return {
        gateways: server.gateways
      };
    }
  });
  const gpath = "/api-gateway/";
  apollo.applyMiddleware({ app: server.app, path: gpath });
}