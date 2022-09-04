const amqp = require("amqplib")

const message = {
    description: "Bu bir test mesajidir..."
}

const data = require("./data.json");

/// queue name belirlenmedi ise varsayilan jobQueue' e gonderecek
/// npm run publisher => varsayilan calistirma metodu
/// npm run publisher queue_name => ozel queue name belirleyerek calistirmak icin

const queueName = process.argv[2] || "jobsQueue";
//console.log("qu",queueName);
//return false;

connect_rabbitmq();

async function connect_rabbitmq(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
        const assertion = await  channel.assertQueue(queueName)

        data.forEach(element => {
            message.description = element.id
            channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)))
            console.log("Gonderilen mesaj: ",element.id)
        });




       /* ========== interval ===================
        setInterval(()=>{
            message.description = new Date().getTime();
            channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)));
            console.log("Gonderilen Mesaj",message);
        },1) */

  //  channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)));


    }catch(error){
        console.log("Error",error)
    }
}