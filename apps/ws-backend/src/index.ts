import { WebSocketServer,WebSocket } from "ws";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const { prismaClient } = require("@repo/db/client");
const { JWT_SECRET } = require("@repo/be-common/src/index");
const port = Number(process.env.PORT) || 8080;
const wss = new WebSocketServer({ port });
import Redis from "ioredis";

dotenv.config();

const redis = new Redis(process.env.REDIS_URL || "");

interface User {
  rooms: string[];
  userId: string;
  ws: WebSocket;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded == "string") {
      return null;
    }
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (e) {
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });
  ws.on("message", async function connection(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); 
    }

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x === parsedData.room);
    }

    console.log("message received");


    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;

      const message = parsedData.message;
      const shape = JSON.parse(message).shape.id;
      console.log(shape);
      // console.log(shape.id);

      const redisKey = `room:${roomId}:shapes`;

      const chatObject = {
        id: shape,
        roomId: Number(roomId),
        message: message,
        userId,
      };

      await redis.hset(redisKey, shape, JSON.stringify(chatObject));

      await prismaClient.chat.create({
        data: chatObject,
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            }),
          );
        }
      });
    }

    if (parsedData.type === "delete") {
      const roomId = parsedData.roomId;

      try {
        const delItem = JSON.parse(parsedData.message).deletedShapes;
        const redisKey = `room:${roomId}:shapes`;

        console.log("Trying to delete:", delItem);

        await redis.hdel(redisKey, ...delItem);

        await prismaClient.chat.deleteMany({
          where: {
            id: {
              in: delItem,
            },
          },
        });
        const shapes = await redis.hgetall(redisKey);

        const updatedShapes = Object.values(shapes).map((x) => JSON.parse(x));

        console.log("updated Shapes from REDIS", updatedShapes);

        users.forEach((user) => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(
              JSON.stringify({
                type: "updatedShapes",
                updatedShapes,
                roomId,
              }),
            );
          }
        });
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  });
});
