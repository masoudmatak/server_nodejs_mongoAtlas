const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://brommasodermalm:abgosht01@clustermmdok-rwvsj.gcp.mongodb.net/brommasodermalm?retryWrites=true&w=majority";
const DATABASE_NAME = "brommasodermalm";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(80, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        //collection = database.collection("document");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});




app.post("/document", (request, response) => {
	 collection = database.collection("document");
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
        console.log("document insert ........");
    });
});

app.get("/document", (request, response) => {
	 collection = database.collection("document");
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
        console.log("find all document..."+result);
    });
});

app.get("/document/:id", (request, response) => {
	 collection = database.collection("document");
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
		console.log("find document with id...");
    });
});


app.post("/person", (request, response) => {
	collection = database.collection("people");
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
        console.log("en insert har kommit in........");
    });
});

app.get("/people", (request, response) => {
	collection = database.collection("people");
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
        console.log("en request har kommit in..."+result);
    });
});


app.get("/person/:id", (request, response) => {
	collection = database.collection("people");
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//https://www.thepolyglotdeveloper.com/2018/09/developing-restful-api-nodejs-mongodb-atlas/