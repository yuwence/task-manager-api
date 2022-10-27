//CRUD create read update delete

const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectId

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client) => {
    if (error) {
        return console.log("Unable to connect tot database!")
    }
    
    const db = client.db(databaseName)

/*     db.collection("users").deleteMany({
        age: 22
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    }) */
    db.collection("tasks").deleteOne({
        description : "Clean the house"
    }).then((resulet)=>{
        console.log(resulet)
    }).catch((error)=>{
        console.log(error)
    })
})
