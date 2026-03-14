"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateRoom() {
    const [slug, setSlug] = useState("");
    const router = useRouter()


    async function handleOnClick(type: "join" | "create") {
        let res;
        let roomId;

        console.log("the slug is", slug);
        if (!slug.trim()) {
            alert("Enter room name")
            return
        }

        if (type === "join") {
            res = await axios.get(`${HTTP_BACKEND}/room/${slug}`)
            roomId = res.data.room.id;
        } else {
            res = await axios.post(`${HTTP_BACKEND}/room`, { slug: slug }, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            roomId = res.data.roomId;
        }

        if (!res.data.room) {
            alert("Room not found")
            return
        }

        console.log(roomId);
        router.push(`/canvas/${roomId}`);
    }
    return <div className="w-screen h-screen flex justify-center items-center gap-2 bg-amber-200">
        <div>
            <Input type="text" placeholder="room name" onChange={(e) => setSlug(e.target.value)} />
            <div className="flex gap-2">
                <Button onClick={() => {handleOnClick("join")
                }}>Join Room</Button>
                <Button onClick={() => {handleOnClick("create")
                }}>Create Room</Button>
            </div>
        </div>


    </div>
}
