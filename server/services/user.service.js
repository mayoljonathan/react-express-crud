const { v4: uuidv4 } = require("uuid");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
console.log("__dirname", __dirname);
console.log("process.cwd", process.cwd());

// const dbPath = path.join(process.cwd(), "db", "data.json");
const dbPath = path.join(__dirname, "..", "db", "data.json");
console.log("dbPath", dbPath);

let userDb;
try {
  userDb = JSON.parse(readFileSync(dbPath, "utf-8"));
} catch (e) {
  console.error(e);
  userDb = {};
}

// Sample only to simulate
const delay = 100;

const Find = async () => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userList = [];
        for (const id in userDb) {
          userList.push(userDb[id]);
        }

        resolve(userList);
      }, delay);
    });
  } catch (e) {
    throw Error(e);
  }
};

const FindOne = async (id) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = userDb[id];
        resolve(user);
      }, delay);
    });
  } catch (e) {
    throw Error(e);
  }
};

const Create = async (data) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { firstName, lastName } = data;
        const id = uuidv4();

        const userData = {
          id,
          firstName,
          lastName,
        };

        userDb[id] = userData;
        writeFileSync(dbPath, JSON.stringify(userDb, null, 2));

        resolve(userData);
      }, delay);
    });
  } catch (e) {
    throw Error(e);
  }
};

const Update = async (id, data) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        userDb[id] = { id, ...data };
        writeFileSync(dbPath, JSON.stringify(userDb, null, 2));

        resolve(userDb[id]);
      }, delay);
    });
  } catch (e) {
    throw Error(e);
  }
};

const Delete = async (id) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        delete userDb[id];
        writeFileSync(dbPath, JSON.stringify(userDb, null, 2));

        resolve(true);
      }, delay);
    });
  } catch (e) {
    throw Error(e);
  }
};

module.exports = {
  Find,
  FindOne,
  Create,
  Update,
  Delete,
};
