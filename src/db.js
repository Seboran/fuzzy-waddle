import { Client } from "pg";
import { initializeDatabase, incrementMessageCountQuerry } from "./db/querries";

const DATABASE_NAME = process.env.PROGRESQL_DATABASE;

class Database {

  client = new Client();
  constructor() {
    await client.connect();
  }

  initialize() {
    client.query(initializeDatabase, [DATABASE_NAME])
  }

  incrementMessage(userId) {
    client.query(incrementMessageCountQuerry, [DATABASE_NAME, userId, "MESSAGE_COUNT"]);
  }

  

}



// Initialize database;


client.query(query);

// Initialize connexion

