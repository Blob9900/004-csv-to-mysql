import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import * as mysql from 'mysql2';
import { myPassword } from './password.js';
import { exit } from 'process';

export function getFileName() {
  if (process.argv[2]) {
    return process.argv[2];
  } else {
    console.log("ERROR: No file input.")
    exit();
  }
}

export function readFile(fileName) {
  return new Promise( (resolve,reject) => {
    let data = [];

    fs.createReadStream(fileName)
    .pipe(fastcsv.parse())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", (rowCount) => {
      console.log(`Finished reading ${rowCount} rows.`);
      resolve(data);     
    })
    .on("error", (error) => {
      console.log(error);
      reject(error);
    })
  })
}

function createQuery(data) {
  let query = `INSERT INTO ${data[0]} (`;
  let headers = data[1];

  headers.map( (column) => {
    query += `${column},`;
  })

  query = query.slice(0, -1) + ') VALUES ?';
  return query;
}

export function writeToDatabase(data) {
  let target = data[0];
  let payload = data;
  let query = createQuery(data);

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: myPassword(),
    database: 'gendum'
  });

  //Remove the headers.
  payload.shift();
  payload.shift();

  console.log([payload]);

  connection.connect(error => {
    if (error) {
      console.log(error);
    } else {
      connection.query(query, [payload], (error, response) => {
        console.log(error || response );
      });
    }
  });
  console.log(`Finished uploading data to ${target}.`)
}
