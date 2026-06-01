const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const {PORT}=require('./config/serverConfig')

const {sendBasicEmail}=require('./services/email-service.js');

const jobs=require('./utils/job.js');

const apiRoutes=require('./routes/index.js');
const setupAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    
    app.use('/api',apiRoutes);
    app.listen(PORT,()=>{
        console.log(`Server started at Port:${PORT}`)

        // sendBasicEmail(
        //     'support@admin.com',
        //     'sundaramgupta062@gmail.com',
        //     'This is a testing email',
        //     'Hey,how are you ,I hope you like the support'
        // )
        jobs();
        
        
    })
}


setupAndStartServer();