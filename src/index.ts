import { Client } from "pg"

const client = new Client({
})

async function querySafely(email:string){
    try{
        await client.connect();
        const selectQuery = "SELECT * FROM users WHERE email = $1";
        const values = [email]
        const result = await client.query(selectQuery,values)
        if(result.rows.length > 0){
            console.log("User found",result.rows[0])
            return result.rows[0]
        }else{
            console.log("User not found")
            return null
        }
    }catch(err){
        console.error("Error fetching user",err)
        throw err
    }finally{
        await client.end()
    }
}

querySafely('user5@example.com').catch(console.error)
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