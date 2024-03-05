import MongoSingleton from "./config/mongodb-singleton.js";

const db = MongoSingleton.getInstance();

export default db;