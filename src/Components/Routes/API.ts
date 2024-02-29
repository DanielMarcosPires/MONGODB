import { COLLECTION_NAME, DB_NAME, URL_DB, USER_TYPE } from "@/Constants/db";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = URL_DB;
export const Client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

export async function API() {
    try {
      await Client.connect();
     
      const database = Client.db(DB_NAME);
      const collection = database.collection(COLLECTION_NAME);
      const documents = await collection.find({}).toArray();
     
      await Client.db(USER_TYPE).command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      console.log(documents)
      return (documents)  
    } catch (err) {
      console.log(err);
    }finally{
        await Client.close();
        console.log("Banco fechado!")
    }
  }