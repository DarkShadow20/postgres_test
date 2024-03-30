"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://anujt2285:iwTGuOPq2r3S@ep-cold-voice-a5ylcsd2.us-east-2.aws.neon.tech/neondb?sslmode=require"
});
function querySafely(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const selectQuery = "SELECT * FROM users WHERE email = $1";
            const values = [email];
            const result = yield client.query(selectQuery, values);
            if (result.rows.length > 0) {
                console.log("User found", result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log("User not found");
                return null;
            }
        }
        catch (err) {
            console.error("Error fetching user", err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
querySafely('user5@example.com').catch(console.error);
// async function insertDataSafely(username:string,email:string,password:string){
//     try{
//         await client.connect();
//         const insertQuery = "INSERT INTO USERS (username,email,password) VALUES($1,$2,$3)";
//         const values = [username,email,password]
//         const res = await client.query(insertQuery,values)
//         console.log("insertion successful", res)
//     }catch(err){
//         console.error("Error during insertion",err)
//     }finally{
//         await client.end()
//     }
// }
// insertDataSafely('username5', 'user5@example.com', 'user_password').catch(console.error);
// async function insertData() {
//     try {
//       await client.connect(); // Ensure client connection is established
//       const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
//       const res = await client.query(insertQuery);
//       console.log('Insertion success:', res); // Output insertion result
//     } catch (err) {
//       console.error('Error during the insertion:', err);
//     } finally {
//       await client.end(); // Close the client connection
//     }
//   }
//   insertData();
// async function createUsersTable (){
//     await client.connect();
//     const result = await client.query(`
//     CREATE TABLE users (
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     )`)
//     console.log(result)
// }
//createUsersTable()
