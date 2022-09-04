const amqp = require("amqplib")
//// node js publisher2.js
const message = {
    description: "Bu bir test mesajidir..."
}

connect_rabbitmq();

async function connect_rabbitmq(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
         const assertion = await  channel.assertQueue("jobsQueue")

        setInterval(()=>{
            message.description = new Date().getTime();
            channel.sendToQueue("jobsQueue",Buffer.from(JSON.stringify(message)));
            console.log("Gonderilen Mesaj",message);
        },1)

  //  channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)));


    }catch(error){
        console.log("Error",error)
    }
}