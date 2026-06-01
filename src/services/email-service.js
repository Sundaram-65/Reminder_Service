const sender=require('../config/emailConfig');
const TicketRepository=require('../repository/ticket-repository')
const ticketRepository=new TicketRepository();
const sendBasicEmail=async(mailFrom,mailTo,mailSubject,mailBody)=>{

   try {
    const response=await sender.sendMail({
        from:mailFrom,
        to:mailTo,
        subject:mailSubject,
        text:mailBody
    });
    console.log(response)
   } catch (error) {
    console.log(error)
   }
   

}

const fetchPendingEmail=async(timestamp)=>{
    try {
        const response=await ticketRepository.get({status:"Pending"});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification=async(data)=>{
    try {
        const response=await ticketRepository.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateTicket=async(ticketId,status)=>{
    try {
        const response=await ticketRepository.update(ticketId,status);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports={
    sendBasicEmail,
    fetchPendingEmail,
    createNotification,
    updateTicket
}