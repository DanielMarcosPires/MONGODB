import { MongoClient, ServerApiVersion } from "mongodb";


export class mongoDB{
    private DB_URL = "mongodb://localhost:27017";

    public async mongoDB_Starter(){
        let client = new MongoClient(this.DB_URL,{
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
              },
        })
        try{
            await client.connect()
            return client.db("Teste");
        }catch(e){
            console.error(e)
        }finally{
            setTimeout(() => {client.close},5000)
        }
    }
    public async mongoDB_Listar(){
        return this.mongoDB_Starter().then((response)=>{
           let collection = response?.collection("Hello world");
           const doc = collection?.find({}).toArray();
           return doc
        })
    }
}

new mongoDB();