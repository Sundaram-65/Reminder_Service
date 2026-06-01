const cron =require('node-cron');

const emailService =require('../services/email-service');

const sender=require('../config/emailConfig');

const setupJobs=()=>{

    cron.schedule('*/2 * * * *', async() => {
        const response=await emailService.fetchPendingEmail();
        
        response.forEach((email)=>{
            sender.sendMail({
                to:email.receipientEmail,
                subject:email.subject,
                text:email.content
            },async(err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    await emailService.updateTicket(email.id,"Success");
                }
            })
        });
        console.log(response);
    });

}

module.exports=setupJobs;
