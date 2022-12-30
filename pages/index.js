import Head from "next/head";
import { useEffect, useState } from "react";
import io from "Socket.IO-client";
let socket;

export default function Home() {
  const [input, setInput] = useState("");

  useEffect(() => {
    const socketInitializer = async () => {
      console.log("fetching socket connection");
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("update-input", (msg) => {
        console.log(`received: ${msg}`);
        setInput(msg);
      });
    };

    if (!socket) {
      socketInitializer();
    }
  }, []);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <>
      <Head>
        <title>Next Chat</title>
        <meta name="description" content="Next Chat App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Home</h1>
        <input
          placeholder="Type something"
          value={input}
          onChange={onChangeHandler}
        />
      </main>
    </>
  );
}
