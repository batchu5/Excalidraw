"use client";

import { useEffect, useRef, useState } from "react";
import { IconButton } from "./iconButton";
import {
  ArrowUpIcon,
  Circle,
  Eraser,
  Hand,
  MousePointer,
  Pencil,
  RectangleHorizontalIcon,
} from "lucide-react";
import { Game } from "@/draw/Game";
import { motion } from "motion/react";

export type Tool =
  | "circle"
  | "rect"
  | "pencil"
  | "arrow"
  | "eraser"
  | "panning"
  | "selection";

export type Color =
  | "white"
  | "red"
  | "yellow"
  | "blue"
  | "purple"
  | "green";

export default function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");
  const [selectedColor, setSelectedColor] = useState<Color>("white");
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game?.resize(); 
      };

      resizeCanvas(); // initial size
      const g = new Game(canvas, roomId, socket);
      setGame(g);

      window.addEventListener("resize", resizeCanvas);

      return () => {
        g.destroy();
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, [canvasRef]);

  useEffect(() => {
    game?.setTool(selectedTool);
    game?.setColor(selectedColor);
  }, [selectedTool, selectedColor, game]);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <canvas ref={canvasRef} className="absolute top-0 left-0 bg-black" />
      <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      <SideBar
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex gap-2 bg-neutral-800 px-4 py-2 rounded-2xl overflow-x-auto max-w-[90vw]">
        <IconButton
          activated={selectedTool == "pencil"}
          icon={<Pencil />}
          onClick={() => setSelectedTool("pencil")}
        />
        <IconButton
          activated={selectedTool == "rect"}
          icon={<RectangleHorizontalIcon />}
          onClick={() => setSelectedTool("rect")}
        />
        <IconButton
          activated={selectedTool == "circle"}
          icon={<Circle />}
          onClick={() => setSelectedTool("circle")}
        />
        <IconButton
          activated={selectedTool == "arrow"}
          icon={<ArrowUpIcon />}
          onClick={() => setSelectedTool("arrow")}
        />
        <IconButton
          activated={selectedTool == "eraser"}
          icon={<Eraser />}
          onClick={() => setSelectedTool("eraser")}
        />
        <IconButton
          activated={selectedTool == "panning"}
          icon={<Hand />}
          onClick={() => setSelectedTool("panning")}
        />
        <IconButton
          activated={selectedTool == "selection"}
          icon={<MousePointer />}
          onClick={() => setSelectedTool("selection")}
        />
      </div>
    </div>
  );
}

function SideBar({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: Color;
  setSelectedColor: (c: Color) => void;
}) {
  const colors = [
    { color: "red", className: "bg-red-500 hover:border-red-300" },
    { color: "yellow", className: "bg-yellow-500 hover:border-yellow-300" },
    { color: "blue", className: "bg-blue-500 hover:border-blue-300" },
    { color: "white", className: "bg-white hover:border-neutral-500" },
    { color: "green", className: "bg-green-500 hover:border-green-300" },
    { color: "purple", className: "bg-purple-500 hover:border-purple-300" },
  ];

  return (
    <div className="fixed top-1/3 left-4 z-10 flex flex-col gap-2">
      {colors.map(({ color, className }) => (
        <motion.div
          key={color}
          whileHover={{ scale: 1.12 }}
          onClick={() => setSelectedColor(color as Color)}
          className={`w-[28px] h-[28px] rounded-full cursor-pointer border-2 ${
            selectedColor === color ? "ring-2 ring-white" : ""
          } ${className}`}
        />
      ))}
    </div>
  );
}
