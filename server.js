const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {isEmptyPayload, isInvalidEmail} = require('./validator')

const { MongoClient } = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const dbName = 'company_db'
const collectionName = 'employees'


app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

app.get('/get-profile', async function(req, res){
    // get data from database, but since we havent learn about database, we put in some data here first

    // connect to db
    await client.connect()
    console.log('Connected successfully to server')

    // initiatie or connect to the database and collection
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    // get data from database
    const result = await collection.findOne({id: 1})
    console.log(result)
    client.close()

    response = {}

    if(result !== null) {
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests 
        } 
    } 
    
    res.send(response)
    
})

app.post('/update-profile', async function(req, res){
    const payload = req.body
    console.log(payload)
 
    if (isEmptyPayload(payload) || isInvalidEmail(payload)) {
        res.status(400).send({error: "invalid payload. Couldnt update your profile"})
    } else {
        // connnect to mongodb database
        await client.connect()
        console.log('Connected successfully to server')

        // initiatie or connect to the database and collection
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        // saving payload into database
        payload['id'] = 1
        const updatedValues = { $set:payload}
        await collection.updateOne({id: 1}, updatedValues, {upsert: true})
        client.close()

    res.status(200).send({info:"user profile data updated successfully"})
    }
})

const server = app.listen(3000,function(){
    console.log("app listening on port 3000")
})

module.exports = {
    app,
    server
}