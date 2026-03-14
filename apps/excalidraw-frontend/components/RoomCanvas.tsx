"use client"
import { WS_URl } from "@/config";
import { useEffect, useState } from "react";
import Canvas from "./Canvas";
export default function RoomCanvas({ roomId }: { roomId: string }) {

    const [socket, setSocket] = useState<WebSocket | null>();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const ws = new WebSocket(`${WS_URl}?token=${token}`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }
    }, [])
    if (!socket) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-neutral-900 text-white">

                <div className="w-12 h-12 border-4 border-neutral-600 border-t-white rounded-full animate-spin"></div>

                <p className="mt-6 text-lg font-medium">Connecting to room...</p>
                <p className="text-sm text-neutral-400">Setting up your canvas</p>

            </div>
        );
    }

    return <Canvas roomId={roomId} socket={socket} />

} 