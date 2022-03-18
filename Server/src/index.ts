import express, { Request, Response } from "express";
import cors from "cors";
import process from "process"
import bodyParser from "body-parser";
import path from "path";

const port: number = 81;

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

app.use( "/", express.static( path.join( __dirname, "static" ) ) );
app.get( "/", (req, res)=>{
    res.send({
        message:"Hello"
    });
});
const server = app.listen(port, () => { console.log("server initialized"); });