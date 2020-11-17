const path = require("path")
const express = require('express')
const moment = require('moment');
const app = express()
const bodyParser = require('body-parser')
const server = require('http').createServer(app)
const db = require('mysql-promise')()
const cookieParser = require('cookie-parser')
const md5 = require('md5')
const JWS = require('jsonwebtoken')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
const request = require("postman-request")
const JWS_SECRET = "jsadh kasduqwuidahsjdkahsd asdghjagfjagsdfjh dafd"
const favicon = require('express-favicon');
const io = require('socket.io')(server);


const { base64encode, base64decode } = require('nodejs-base64');



let online = {}

db.configure({
	"host": "localhost",
	"user": "root",
	"password": "Hannover200.",
	"database": "selfiestar"
});

let query = function(query){
    return new Promise(function(resolve,reject){
        db.query(query).then(function (rows) {
            resolve(rows)
        },(rows)=>{
            reject(rows)
        })
    })
}
function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));
app.use(cookieParser())
app.use(favicon('Public/logo.png'));
app.use('/public', express.static('Public'))
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,authtoken");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});









app.all("*",(req,res,next)=>{
    if(req.path != "/auth" && !req.path.startsWith("/admin") && !req.path.startsWith("/public")){
        try{
            let user = JWS.verify(req.header('authToken'),JWS_SECRET)
            console.log(user)
            query(`SELECT * FROM users WHERE id='${user.id}'`).then((result)=>{
                if(result[0].length == 0){
                    res.send("0")
                    return
                }

                if(md5(result[0][0]['username']+result[0][0]['password']) == user.user_hash){
                    req.local_data = user
                    next()
                }else{
                    res.send("0")
                }
            })
            
        }catch(err){
            res.send("0")
        }
    }else{
        next()
    }
    
})

app.post("/auth", (req,res)=>{
    try{
        console.log("hello")
        query(`SELECT * FROM users WHERE username='${req.body.username}' AND password='${req.body.password}'`).then((result)=>{
            console.log(JSON.stringify(result[0][0]) +"   "+result[0].length)
            if(result[0].length != 0){
                let token = JWS.sign(
                    {
                        id: result[0][0]['id'],
                        chat_username: result[0][0]['chat_username'],
                        chat_password: result[0][0]['chat_password'],
                        name:result[0][0]['name'],
                        user_hash: md5(result[0][0]['username']+result[0][0]['password']),
                        appVersion: req.body.appVersion
                    },
                    JWS_SECRET,{
                        noTimestamp:true
                    }
                );
                request("http://localhost:9000/auth" ,{
                    method:"POST",
                    form:{
                        user: result[0][0]['chat_username'],
                        password: result[0][0]['chat_password']
                    }
                },(error, response, body)=>{
                    res.send(token)
                    // if(body == '1'){
                    //     res.send(token)
                    // }else{
                    //     res.send("0")
                    // }
                }) 
            }else{
                res.send("0")
            }
        })
        
    }catch(err){
        res.send("0")
    }  
})

app.post("/checkauth", (req,res)=>{
    res.send('1')
})

app.post("/online", (req,res)=>{
    try{
        let user = JWS.verify(req.header('authToken'),JWS_SECRET)
        online[user['id']] = moment()
    }catch{
        
    }
    res.sendStatus(200)
})

app.post("/stars", (req,res)=>{
    try{
        console.log(req.body.stars)
        let user = JWS.verify(req.header('authToken'),JWS_SECRET)
        query(`UPDATE users SET stars='${req.body.stars}' WHERE id = '${user['id']}'`)
    }catch{

    }
    
    res.sendStatus(200)
})

app.post("/getStatus", (req,res)=>{
    try{
        let profiles = [];
        Object.keys(req.body.profiles).forEach(id => {
            profiles.push(req.body.profiles[id])
        });

        let promises = []
        promises.push(query(`SELECT max_msg_profile,allow_photos,text_min_len FROM settings,users WHERE users.id = '${req.local_data.id}'`));
        profiles.forEach(profile => {
            promises.push(query(`SELECT COUNT(*) FROM texts WHERE profile='${profile.objectId}' AND date='${moment().format("DD-MM-YYYY")}'`));
        });


        Promise.all(promises).then((values) => {
            let response = {
                max_msg_profile:values[0][0][0]["max_msg_profile"],
                min_text_len: values[0][0][0]["text_min_len"],
                allow_photos: values[0][0][0]["allow_photos"] == 0 ? false : true ,
                profiles_today:{}
            }
            for (let i = 1; i < values.length; i++) {
                response.profiles_today[profiles[i-1].objectId] = values[i][0][0]["COUNT(*)"]
            }  
            console.log(response)
            res.send(response)

        });
    }catch(err){
        res.sendStatus(500)
    } 
})


app.post("/checktext", (req,res)=>{
    try{

        query(`SELECT chat_username,allow_photos,text_min_len,max_last_online FROM settings,users WHERE users.id = '${req.local_data.id}'`).then((result)=>{
            if(result[0][0]['allow_photos'] == 0 && req.body.photo == true){
                res.status(403).send(`Der User darf keine Fotos veschicken!`)
                return
            }

            if(req.body.text.replace(/\s+/g,' ').trim().length < result[0][0]['text_min_len']){
                res.status(403).send(`Der Text muss mindestens ${result[0][0]['text_min_len']} Zeichen lang sein!`)
                return
            }


                

            query(`INSERT INTO hellotexts (user , profile, text, date) 
            SELECT '${parseInt(req.local_data.id) }' ,'${req.body.profile}','${req.body.text.replace(/\s+/g,' ').trim()}','${moment().format("DD-MM-YYYY")}' FROM DUAL
            WHERE NOT EXISTS 
            (SELECT text FROM hellotexts WHERE text='${req.body.text.replace(/\s+/g,' ').trim()}')`).then((result)=>{
                console.log(result)
                if(result[0]['affectedRows'] == 1){
                    res.status(200).send(zeroFill(result[0]['insertId'],10))
                }else{
                    res.status(403).send(`Der Text wurde bereits verwendet!`)
                }
            })

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
        
        promises.push(query(`SELECT 
        users.max_msg_profile,
        settings.max_msg_client,
        settings.max_last_online,
        settings.max_wait,
        settings.min_wait,
        settings.max_unbeantwortet
        FROM users,settings WHERE users.id = '${req.local_data.id}'`))
        promises.push(query(`SELECT COUNT(*) as profilemsg FROM texts WHERE profile='${req.body.profile.objectId}' AND date='${moment().format("DD-MM-YYYY")}'`))
        promises.push(query(`SELECT COUNT(*) as clientmsg FROM texts WHERE client='${req.body.client.objectId}' AND date='${moment().format("DD-MM-YYYY")}'`))
        promises.push(query(`SELECT COUNT(*) as contacttoday FROM texts WHERE client='${req.body.client.objectId}' AND profile='${req.body.profile.objectId}' AND date='${moment().format("DD-MM-YYYY")}'`))

        
        console.log("unresponded : "+req.body.unresponded)
        Promise.all(promises).then((values) => {
            let settings = values[0][0][0]
            let profilemsg = values[1][0][0]["profilemsg"]
            let clientmsg = values[2][0][0]["clientmsg"]
            let contacttoday = parseInt(values[3][0][0]["contacttoday"])  == 0 ? false : true ;

            response.next = Math.floor(Math.random() * (settings["max_wait"] - settings["min_wait"] + 1) + settings["min_wait"]);
            

            if(parseInt(profilemsg)  >= parseInt(settings["max_msg_profile"])  ){
                response.allowed = 0
                response.continue = 0
                res.send(response)
                console.log(`message not sent: ${profilemsg} larger than max_msg_profile:(${settings["max_msg_profile"]})`)
                return
            }

            if(parseInt(clientmsg)  > parseInt(settings["max_msg_client"])  ||  contacttoday){
                response.allowed = 0
                response.continue = 1
                res.send(response)
                console.log(`message not sent: ${clientmsg} larger than max_msg_client:(${settings["max_msg_client"]}) or contacttoday = ${contacttoday} : ${values[3][0][0]["contacttoday"] }`)
                return
            }

            if(parseInt(req.body.unresponded)  > parseInt(settings["max_unbeantwortet"])){
                response.allowed = 0
                response.continue = 1
                res.send(response)
                console.log(`message not sent: ${req.body.unresponded} larger than max_unbeantwortet:(${settings["max_unbeantwortet"]})`)
                return
            }

            let d = moment(req.body.client.lastseen)
            let diff = moment().diff(d, 'minutes');
            if(parseInt(settings["max_last_online"])  <  diff && req.body.profile.clienttype == 0){
                response.allowed = 0
                response.continue = 1
                response.reroll = 1
                res.send(response)
                console.log(`message not sent: ${diff} larger than max_last_online(${settings["max_last_online"]}) and client type = ${req.body.profile.clienttype}`)
                return
            }

            


            if(response.allowed == 1){
                io.emit('message', {
                    profile:req.body.profile.objectId,
                    client:req.body.client.objectId,
                    timestamp:moment().format("DD-MM-YYYY  HH:mm"),
                    name:req.local_data.name,
                    chat_username:req.local_data.chat_username,
                    text:req.body.profile.text
                });
                console.log(req.body.profile.textId)
                console.log(`INSERT INTO texts (user ,profile, client, text, date) VALUES ('${req.local_data.id}','${req.body.profile.objectId}','${req.body.client.objectId}','${req.body.profile.textId}','${moment().format("DD-MM-YYYY")}')`)
                query(`INSERT INTO texts (user ,profile, client, text, date) VALUES ('${req.local_data.id}','${req.body.profile.objectId}','${req.body.client.objectId}','${req.body.profile.textId}','${moment().format("DD-MM-YYYY")}')`)
                console.log(`${req.body.profile.username} -> ${req.body.client.objectId} : ${req.body.profile.text}`)
                res.send(response)
            }

            
            
        })
    }catch(err){
        res.sendStatus(500)
    } 
})
     


////////////////// Admin Panel \\\\\\\\\\\\\\\\\\

app.all("/admin*" , (req,res,next)=>{
    if(req.path == "/admin" || req.path == "/admin/" ){
        res.redirect("/admin/mitarbeiter")
        return
    }
    if(req.path == "/admin/login"){
        next()
        return
    }


    if(req.cookies["token"] != undefined ){
        try{
            let user = JWS.verify(req.cookies["token"],JWS_SECRET)
            query(`SELECT admin_username,admin_password FROM settings`).then((result)=>{
                if(md5(result[0][0]['admin_username']+result[0][0]['admin_password']) == user.hash){
                    next()
                    return
                }else{
                    res.redirect("/admin/login")
                    return
                }
            })
        }catch{
            res.redirect("/admin/login")
        }
    }else{
        res.redirect("/admin/login")
    }
})

app.get("/admin/:tab",(req,res)=>{
    switch(req.params.tab){
        case "login": 
            res.render("pages/login")  
        break;
        case "logout": 
            res.cookie("token","")
            res.redirect("/admin/login") 
        break;
        case "mitarbeiter": 
            query(`SELECT * FROM users`).then((result)=>{
                query(`SELECT * FROM settings LIMIT 1`).then((result2)=>{
                    res.render("pages/main" , {
                        tab:req.params.tab,
                        data:result[0],
                        settings:result2[0][0]
                    })     
                })    
            })
            
        break;
        case "statistiken": 
            query(`SELECT id,name,ext,chat_username,stars FROM users`).then((result)=>{
                let data = []
                result[0].forEach(row=>{
                    let d = {
                        id:row["id"],
                        name:row["name"],
                        username:row["chat_username"],
                        ext:row["ext"],
                        stars:row["stars"],
                        online:online[row["id"]] != undefined ? moment().diff(moment(online[row["id"]]), 'minutes') < 2 ? true : false : false
                    }
                    data.push(d)
                })
                res.render("pages/main" , {
                    tab:req.params.tab,
                    data:data
                })  
            })
             
        break;
        case "texte": 
            query(`SELECT texts.profile,texts.client,texts.timestamp,users.name , users.chat_username ,hellotexts.text
            FROM texts 
            INNER JOIN users 
                ON texts.user = users.id
            INNER JOIN hellotexts
                ON texts.text = hellotexts.id
            ORDER BY texts.timestamp DESC 
            LIMIT 100`).then((result)=>{
                let data = []
                result[0].forEach(row=>{
                    let d = {
                        profile:row["profile"],
                        client:row["client"],
                        timestamp:moment(row["timestamp"]).format("DD-MM-YYYY  HH:mm"),
                        name:row["name"],
                        chat_username:row["chat_username"],
                        text:row["text"]
                    }
                    data.push(d)
                })
                res.render("pages/main" , {
                    tab:req.params.tab,
                    data:data
                })  
            }) 
             
        break;
        
    }
    
})

app.post("/admin/:tab",(req,res)=>{
    try{
        switch(req.params.tab){
            case "login": 
                if(req.body.username == undefined || req.body.password == undefined){
                    res.redirect("/admin/login")
                    return
                } 
                
                query(`SELECT admin_username,admin_password FROM settings`).then((result)=>{
                    if(result[0][0]['admin_username'] == req.body.username && result[0][0]['admin_password'] == req.body.password){
                        let token = JWS.sign(
                            {
                                hash: md5(result[0][0]['admin_username']+result[0][0]['admin_password'])
                            },
                            JWS_SECRET,{
                                noTimestamp:true
                            }
                        );
                        res.cookie("token" , token)
                        res.redirect("/admin/mitarbeiter")
                    }else{
                        res.redirect("/admin/login")
                    }

                })

            break;
            case "settings": 
                query(`UPDATE settings SET 
                    admin_username='${req.body.admin_username}',
                    admin_password='${req.body.admin_password}',
                    min_wait='${req.body.min_wait}',
                    max_wait='${req.body.max_wait}',
                    max_msg_client='${req.body.max_msg_client}',
                    max_last_online='${req.body.max_last_online}',
                    text_min_len='${req.body.text_min_len}',
                    max_unbeantwortet='${req.body.max_unbeantwortet}'`
                    
                ).then((result)=>{

                    res.redirect("/admin/mitarbeiter")

                },(res)=>{
                    res.redirect("/admin/mitarbeiter")
                })
            break;
            case "mitarbeiter":
                if(req.body.action == "delete"){
                    query(`DELETE FROM users WHERE id = '${req.body.id}'`)
                    res.redirect("/admin/mitarbeiter")  
                }
                if(req.body.name == undefined ||req.body.username == undefined || req.body.password == undefined || req.body.chat_username == undefined || req.body.chat_password == undefined ){
                    res.sendStatus(403) 
                    return
                }
                if(req.body.action == "new"){
                    query(`INSERT INTO users(name, username, password, chat_username, chat_password,max_msg_profile,allow_photos) VALUES ('${req.body.name}','${req.body.username}','${req.body.password}','${req.body.chat_username}','${req.body.chat_password}','${req.body.max_msg_profile}','${req.body.allow_photos}')`).then((result)=>{
                        res.send("")   
                    },()=>{
                        res.redirect("/admin/mitarbeiter")
                    })
                }else if(req.body.action == "update"){
                    query(`UPDATE users SET name='${req.body.name}', username='${req.body.username}',password='${req.body.password}',chat_username='${req.body.chat_username}',chat_password='${req.body.chat_password}',max_msg_profile='${req.body.max_msg_profile}',allow_photos='${req.body.allow_photos}' WHERE id = '${req.body.id}'`).then((result)=>{
                        res.send("")   
                    },()=>{
                        res.redirect("/admin/mitarbeiter")
                    })
                }
                
            break;
        }
    }catch{
        res.send("")
    }
    
    
})






server.listen( 8000, ()=>{
    console.info(`HTTP server started on port ${server.address().port}`);
}); 

