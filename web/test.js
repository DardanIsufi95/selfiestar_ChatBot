const path = require("path")
const express = require('express')
const moment = require('moment');
const app = express();
const bodyParser = require('body-parser')
const server = require('http').createServer(app);
const db = require('mysql-promise')();
const md5 = require('md5');

db.configure({
	"host": "192.168.88.10",
	"user": "dardanisufi",
	"password": "D4rd4n.!$ufI",
	"database": "selfiestar"
});

let query = function(query){
    return new Promise(function(resolve,reject){
        db.query(query).then(function (rows) {
            resolve(rows)
        })
    })
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.all("*",(req,res,next)=>{
    if(req.path != "/auth" && req.path != "/checkauth"){
        try{
            query(`SELECT username,password FROM settings`).then((result)=>{
                if(md5(result[0][0]['username']+result[0][0]['password']) == req.header('authToken')){
                    next()
                }else{
                    res.sendStatus(403)
                }
            })
            
        }catch(err){
            res.sendStatus(403)
        }
    }else{
        next()
    }
    
})

app.post("/auth", (req,res)=>{
    try{
        query(`SELECT username,password FROM settings`).then((result)=>{
            if(result[0][0]['username']==req.body.username && result[0][0]['password']==req.body.password){
                res.send(md5(result[0][0]['username']+result[0][0]['password']))
            }else{
                res.sendStatus(403)
            }
        })
        
    }catch(err){
        res.sendStatus(500)
    }  
})

app.post("/checkauth", (req,res)=>{
    try{
        query(`SELECT username,password FROM settings`).then((result)=>{
            if(md5(result[0][0]['username']+result[0][0]['password']) == req.body.token){
                res.sendStatus(200)
            }else{
                res.sendStatus(403)
            }
        })
        
    }catch(err){
        res.sendStatus(500)
    } 
})

app.post("/getStatus", (req,res)=>{
    try{
        let profiles = [];
        Object.keys(req.body.profiles).forEach(id => {
            profiles.push(req.body.profiles[id])
        });

        let promises = []
        promises.push(query(`SELECT max_msg_profile,text_min_len FROM settings`));
        profiles.forEach(profile => {
            promises.push(query(`SELECT COUNT(*) FROM texts WHERE profile='${profile.objectId}' AND date='${moment().format("DD-MM-YYYY")}'`));
        });


        Promise.all(promises).then((values) => {
            let response = {
                max_msg_profile:values[0][0][0]["max_msg_profile"],
                min_text_len: values[0][0][0]["text_min_len"],
                profiles_today:{}
            }
            for (let i = 1; i < values.length; i++) {
                response.profiles_today[profiles[i-1].objectId] = values[i][0][0]["COUNT(*)"]
            }  
            
            res.send(response)

        });
    }catch(err){
        res.sendStatus(500)
    } 
})


app.post("/checktext", (req,res)=>{
    try{
        query(`SELECT text_min_len,max_last_online FROM settings`).then((result)=>{
            let min = result[0][0]['text_min_len']
            if(req.body.text.replace(/\s+/g,' ').trim().length >= min){

                

                query(`INSERT INTO hellotexts (profile, text, date) 
                SELECT '${req.body.profile}','${req.body.text.replace(/\s+/g,' ').trim()}','${moment().format("DD-MM-YYYY")}' FROM DUAL
                WHERE NOT EXISTS 
                (SELECT text FROM hellotexts WHERE text='${req.body.text.replace(/\s+/g,' ').trim()}')`).then((result)=>{
                    if(result[0]['affectedRows'] == 1){
                        res.status(200).send()
                    }else{
                        res.status(403).send(`Der Text wurde bereits verwendet!`)
                    }
                })

            }else{
               res.status(403).send(`Der Text muss mindestens ${min} Zeichen lang sein!`) 
            }
        })
        
    }catch(err){
        res.sendStatus(500)
    } 
})

app.post("/checkmsg", (req,res)=>{
    try{
        let response = {
            allowed:1,
            continue:1,
            next:0,
            reroll:0
        }

        let promises = []
        
        promises.push(query(`SELECT * FROM settings`))
        promises.push(query(`SELECT COUNT(*) FROM texts WHERE profile='${req.body.profile.id}' AND date='${moment().format("DD-MM-YYYY")}'`))
        promises.push(query(`SELECT COUNT(*) FROM texts WHERE client='${req.body.client.objectId}' AND date='${moment().format("DD-MM-YYYY")}'`))
        promises.push(query(`SELECT COUNT(*) FROM texts WHERE client='${req.body.client.objectId}' AND profile='${req.body.profile.id}' AND date='${moment().format("DD-MM-YYYY")}'`))
        

        Promise.all(promises).then((values) => {

            let settings = values[0][0][0]
            let profilemsg = values[1][0][0]["COUNT(*)"]
            let clientmsg = values[2][0][0]["COUNT(*)"]
            let contacttoday = values[3][0][0]["COUNT(*)"] == 0 ? false : true ;

            response.next = Math.floor(Math.random() * (settings["max_wait"] - settings["min_wait"] + 1) + settings["min_wait"]);

            if(profilemsg > settings["max_msg_profile"] ){
                response.allowed = 0
                response.continue = 0
            }

            if(clientmsg > settings["max_msg_client"] ||  contacttoday){
                response.allowed = 0
                response.continue = 1
            }

            let d = moment(req.body.client.lastseen)
            let diff = moment().diff(d, 'minutes');
            console.log(diff)
            if(settings["max_last_online"] <  diff){
                response.allowed = 0
                response.continue = 1
                response.reroll = 1
            }


            if(response.allowed == 1){
                query(`INSERT INTO texts (profile, client, text, date) VALUES ('${req.body.profile.id}','${req.body.client.objectId}','${req.body.profile.text}','${moment().format("DD-MM-YYYY")}')`)
            }


            res.send(response)
            
        })
    }catch(err){
        res.sendStatus(500)
    } 
})


server.listen(process.env.PORT || 4000, ()=>{
    console.info(`HTTP server started on port ${server.address().port}`);
});