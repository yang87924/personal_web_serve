const config={
    port:3000,
    database:{
        HOST:process.env.DB_HOST,
        User:process.env.DB_USER,
        PASSWORD:process.env.DB_PASSWORD,
        DATABASE:process.env.DB_DATABASE,

    }
}
console.log("DB_USER:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_USER:", process.env.DB_DATABASE);

module.exports=config;
