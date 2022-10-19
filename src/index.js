const app=require('./app');

const PORT=process.env.PORT | 3000

const listenCallback=()=>{
    console.log("App running on: "+PORT);
}

app.listen(PORT,listenCallback);