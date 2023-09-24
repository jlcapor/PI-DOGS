const app = require('./src/app')
const {database} = require('./src/db/DB_connection')




const PORT = process.env.PORT || 3001

database.sync({alter: true})
.then(() =>{
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT);
    });
})
.catch((err)=> console.log(err))

