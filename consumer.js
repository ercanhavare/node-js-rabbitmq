const amqp = require("amqplib")

/// npm run consumer => varsayilan calistirma metodu
/// npm run consumer queue_name => ozel queue name belirleyerek calistirmak icin


const queueName = process.argv[2] || "jobsQueue";
const data = require("./data.json");

connect_rabbitmq();

async function connect_rabbitmq(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();

        const assertion = await  channel.assertQueue(queueName)

        // Mesajin alinmasi
        console.log("Mesaj bekleniyor...")

        channel.consume(queueName,message=>{
          /*   console.log("Message",message.content.toString())
            channel.ack(message) */

            const messageInfo = JSON.parse(message.content.toString());
            const userInfo = data.find(u => u.id == messageInfo.description)

            if(userInfo){
                console.log("Islenen kayit:",userInfo)
                channel.ack(message)
            }
            

        })

    }catch(error){
        console.log("Error",error)
    }
}