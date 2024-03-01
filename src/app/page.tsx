/* eslint-disable react/jsx-key */
import { mongoDB } from "@/utils/mongoDB";
const DB = new mongoDB();

export default function Home() {
  return (
    <>
      <div>
        {DB.mongoDB_Listar().then((res) =>
          res?.map((item,index) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.text}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
