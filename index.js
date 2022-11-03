
const mysql = require('promise-mysql');

const getDbConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  })
}

exports.helloWorld = async (req, res) => {
    

    if (req.method == 'GET'){

      if (req.query.name) {
        let _name = req.query.name;
        const getUsersByName = async () => {
            const db = await getDbConnection();
            let users = await db.query('SELECT * FROM rest_emp where name = ?', [_name])
            await db.end()
            return users
        }
        let user = await getUsersByName();
        res.status(200).send(JSON.stringify(user)).end();
     }
     else{

      if(req.url.split('/')[1]) {
        let _id= req.url.split('/')[1];
        const getUsersById = async () => {
            const db = await getDbConnection()
            const users = await db.query("SELECT * FROM rest_emp where id = ?", [_id])
            await db.end()
            return users
        }
        let user = await getUsersById();
        res.status(200).send(JSON.stringify(user)).end();
      }
      else{
        const getUsers = async () => {
            const db = await getDbConnection()
            const users = await db.query("SELECT * FROM rest_emp")
            await db.end()
            return users
        }
        let allUsers = await getUsers();
        res.status(200).send(JSON.stringify(allUsers)).end();


      }
     }
    }
};
