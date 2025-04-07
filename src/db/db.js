// src/db.js
import Dexie from 'dexie';

const db = new Dexie("UWSPhotoDB");

db.version(1).stores({
  photos: "++id, taskId, fileName, timestamp",
  users: "email" // email is primary key
});

export default db;
