import React, { useState } from "react";
import { API, Client } from "../Routes/API";
import { COLLECTION_NAME, DB_NAME, URL_DB, USER_TYPE } from "@/Constants/db";

interface mensage {
  name: string;
  text: string;
  time: number;
}
export default function MongoDB() {
  console.log();

  async function handleSubmit(form: FormData) {
    "use server";
    try {
      if (!form) {
        return;
      }
      const database = await Client.db(DB_NAME);
      const collection = database.collection(COLLECTION_NAME);

      await collection.insertMany([{
        name: "Daniel",
        text: form.get("message"),
        time: new Date(),
      }]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ul className="border w-[300px] h-[300px]">
        {API().then((res) =>
          res?.map((item) => (
            <li key={item.name}>
              <h2 className="text-2xl">{item.name}</h2>
              <p>{item.text}</p>
              <span title="time">{item.time}</span>
            </li>
          ))
        )}
      </ul>
      <form
        className="flex justify-center border w-[300px]"
        action={handleSubmit}
        method="POST"
      >
        <input className="bg-zinc-500 text-white" type="text" name="message" />
        <button className="bg-zinc-400">Send</button>
      </form>
    </>
  );
}
