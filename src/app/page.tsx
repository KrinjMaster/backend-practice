import kv from "@vercel/kv";
import { NextResponse } from "next/server";

export default async function Home() {
  return (
    <main className="text-white font-bold flex h-screen">
      <form className="flex flex-col w-[300px] bg-violet-700 h-[350px] m-auto text-3xl text-center rounded-lg px-10 ">
        <label>Username</label>
        <input type="text" className="bg-transparent border rounded-lg text-lg"></input>
        <label>Email</label>
        <input type="text" className="bg-transparent border rounded-lg text-lg"></input>
        <button className="text-black bg-white rounded-lg relative bottom-0">Submit</button>
      </form>
    </main>
  )
}
