import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import {createTransport, Transporter } from "nodemailer";

const port: number = 80;

class App {
    public application: express.Application;
    constructor() {
        this.application = express();
    }
}

const appObject = new App();
const app = appObject.application;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.use( "/", express.static( path.join( __dirname, "ver_1_01" ) ) );
app.get("*", ( req, res, next )=>{
    if ( req.secure == true ) {
        next();

    } else {
        let to = "https://" + req.headers.host + req.url;
        return res.redirect( to );
    }
});

app.post("/reqMailer", (req, res) => {
    let validate: boolean = true;
    let errorString: string = "";
    let result: string = "Success"

    if ( req == null ) {
        res.send({type: "error", text: "Message is Null"});
    } else {
        if ( req.body.userName.length < 4 ) {
            validate = false;
            errorString = "Name is too short or empty!";
            result = "error";
        }

        let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if ( req.body.userEmail.match(regExp) == null ) {
            validate = false;
            errorString = "Please enter a valid email!";
            result = "error";
        }

        if ( req.body.userMessage.length < 5 ) {
            validate = false;
            errorString = "Too short message! Please enter something.";
            result = "error";
        }

        if ( validate == true ) {
            errorString = "Hi " + req.body.userName + "! Thank you for your email";
            SendMail( req.body );
        }
    }
    res.send({type: result, text: errorString });
});

async function SendMail( content: any ) {
    let transporter = createTransport( {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "creverse.contactus@gmail.com",
            pass: "creverse!@34"
        }
    });

    if ( null == transporter ) {
        return;
    }

    let description: string = "Name: " + content.userName + "<br>" +
        "E-Mail: " + content.userEmail + "<br>" +
        "Message: " + content.userMessage + "<br>";

    let info: any = null;
    try {
        info = await transporter.sendMail( {
            from: "creverse.contactus@gmail.com",
            to: "creverse.contactus@gmail.com",
            subject: "Contact Message from Official Web Site",
            text: "",
            html: description
        });
    } catch (e) {

        return;
    }
}

const server = app.listen(port, () => { console.log("server initialized"); });