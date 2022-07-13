import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import { env } from "process";
import { TwitterConfig } from "./TwitterConfig";
import { TwitterService } from "./TwitterService";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
    },
  },
};

const options = {
  confKey: "config",
  schema,
  dotenv: true,
  data: process.env,
};

const server = fastify();
server.register(fastifyEnv, options);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.get("/tweet", async (request, reply) => {
  var conf = new TwitterConfig(
    process.env.APP_KEY!,
    process.env.APP_SECRET!,
    process.env.ACCESS_TOKEN!,
    process.env.ACCESS_SECRET!
  );
  var service = new TwitterService(conf);
  service.SendTweet("test tweet, plz ignore");
});
