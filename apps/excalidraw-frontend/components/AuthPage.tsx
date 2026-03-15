"use client";
import Input from "./Input";
import { useState } from "react";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleOnClick() {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isSignin ? "signin" : "signup";

      let res;

      if (isSignin) {
        res = await axios.post(`${HTTP_BACKEND}/${endpoint}`, {
          username: email,
          password,
        });
      } else {
        res = await axios.post(`${HTTP_BACKEND}/${endpoint}`, {
          username: email,
          password,
          name: "pushpalatha",
        });
      }

      console.log("Response:", res.data);

      if (isSignin) {
        localStorage.setItem("token", res.data.token);
        router.push("/CreateRoom");
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div className="w-screen h-screen flex justify-center items-center bg-neutral-900">
      <motion.div className="p-8 m-2 bg-amber-200 rounded-2xl text-black border border-black">
        
        <div className="flex justify-center text-3xl font-bold mb-4">
          {isSignin ? "Signin" : "Signup"}
        </div>

        <motion.div whileHover={{ x: 7 }} className="mb-4">
          <Input
            type="text"
            placeholder="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </motion.div>

        <motion.div whileHover={{ x: 7 }} className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: loading ? 1 : 1.12 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            className="bg-black text-amber-100 flex items-center gap-2"
            onClick={handleOnClick}
            disabled={loading}
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-amber-100 border-t-transparent rounded-full animate-spin"></div>
            )}

            {loading ? "Processing..." : isSignin ? "Signin" : "Signup"}
          </Button>
        </motion.div>

        <div className="text-center mt-4">
          {isSignin ? (
            <>
              Don&apos;t have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Signup
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => router.push("/signin")}
              >
                Signin
              </span>
            </>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
}