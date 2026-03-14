
const {JWT_SECRET} = require("@repo/be-common/src/index");
import express from "express";
const app=express();
import cors from "cors";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
const {CreateUserSchema, SigninSchema, RoomSchema} = require("@repo/common/index");
const { prismaClient } = require("@repo/db/client");

app.use(cors());
app.use(express.json());
app.post("/signup", async(req, res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e) {
        res.status(411).json({
            message:   e
        })
    }
})

app.post("/signin", async(req, res)=>{
     const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs",
        })
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if (!user) {
        res.status(403).json({
            message: "Not authorized"
        })
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.json({
        userId : user?.id,
        token
    })
})

app.post("/room", middleware, async (req, res) => {
    const parsedData = RoomSchema.safeParse(req.body);
    console.log(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    const userId = req.userId;
    console.log(userId);
    try{
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.slug,
                adminId: userId
            }
        })
        res.json({
            roomId : room.id
        })
    }catch (e) {
        res.status(500).json({
            message: 'Something went wrong',
            error: e instanceof Error ? e.message : String(e)
        });
    }
})

app.get("/chats/:roomId", async(req, res) => {
    try{
        const roomIdz = Number(req.params.roomId);
        console.log("Incoming roomId:", req.params.roomId, typeof roomIdz);
        const messages = await prismaClient.chat.findMany({
            where:{
                roomId: roomIdz
            },
            orderBy: {
                id:"asc"
            },
            take: 100
        })

        res.json({
            messages: messages
        })
    }catch(e){
        res.json({messages: []})
    }
    
})

app.get("/room/:slug", async(req, res) => {
    try{
        const slug = req.params.slug;
        const room = await prismaClient.room.findUnique({
            where:{
                slug: slug
            }
        })

        res.json({
            room
        })
    }catch(e){
        res.json(e);
    }  
})


app.listen(3001)