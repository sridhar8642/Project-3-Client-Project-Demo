const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

const app = express()
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.dy7wvq9.mongodb.net/feedback`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const feedbackSchema = new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    message : String,
});

const Feedback = mongoose.model("Feedback",feedbackSchema);
app.use(bodyParser.urlencoded ({extended:true}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})
app.post("/feedback",async (req,res)=>{
    try{
        const {name,phone,email,message} = req.body;
        const FeedbackData = new Feedback({
            name,
            phone,
            email,
            message
        })
        await FeedbackData.save();
        console.log('sucessfully sent');
        res.redirect("/success");
    }
    catch{
        console.log('error');
    }
})
app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/success.html");
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})
