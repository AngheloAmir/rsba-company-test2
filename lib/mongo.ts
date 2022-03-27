/*
Usage:
    const db = await ConnectToDatabase();
    const r  = db && await db.find(); //with error checking

    You can change the database by calling the client.db() function and specifying a database like:
    const db = client.db("myDatabase");
    Then you can execute queries against your database like so:
    db.find({}) or any of the MongoDB Node Driver commands

    source: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/pages/index.js
*/

/*
import { MongoClient } from 'mongodb';
import { Collection } from 'mongoose/node_modules/mongodb';

let db :Collection<Document> = null;
export default async function ConnectToDatabase() {
  if(db != null) {
    return db;
  }

  try {
    const uri     = process.env.MONGODB_URI;
    const client  = new MongoClient(uri, {})
    await client.connect();
    
    const rsbadb      = await client.db('RSBATest');
    const collection  = await rsbadb.collection('CV');
    
    //@ts-ignore
    db = collection;
    return db;
  }
  catch (e) {
    db = undefined;
  }
}
*/


import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect;
