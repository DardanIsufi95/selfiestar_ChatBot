const express = require('express')
const app = express()
const port = 9000
const bodyParser = require('body-parser')
const postmanRequest = require("postman-request")
const cheerio = require('cheerio');

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization , authtoken ");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

const JWS = require('jsonwebtoken')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
const JWS_SECRET = "jsadh kasduqwuidahsjdkahsd asdghjagfjagsdfjh dafd"

const AUTH = {
    'user': 'SelfieStar0329',
    'pass': 'My1puVpXqeC3h1id6dkb',
    'sendImmediately': false
}

const userpass = {
    'mt48@selfiestar.de': 'faxx5050'
}


function request(_url,_options){
    let url = "https://adminpanel.selfiestar.tv" + _url
    let options = _options
    options.auth = AUTH
    return new Promise((resolve,reject)=>{
        postmanRequest(url , options ,(error, response, body)=>{
            resolve({error, response, body})
        })
    })
}



let COOKIES = {}

function checkAuth(username){
    return new Promise(async (resolve,reject)=>{
        if(typeof(COOKIES[username]) == 'undefined'){
            COOKIES[username] = postmanRequest.jar()
            resolve(false)
            return
        }

        const response = await request("/user/login",{
            method:"GET",
            followAllRedirects:true,
            jar: COOKIES[username]
        })
        
        if(response.error){
            resolve(false)
            return
        }

        if(response.response.statusCode == 401){
            reject(new Error("AuthFailed"))
        }
        

        let $ = cheerio.load(response.body)
        let potential = undefined
        
        try{
            potential = $("#page > div > p:nth-child(1)").text().split(",")[1].trim().slice(0, -1)
        }catch{

        }

        if(potential != username){
            resolve(false)
            return
        }
        

        resolve(true)
    })
}

function auth(username,password){
    return new Promise(async (resolve,reject)=>{
        
        COOKIES[username] = postmanRequest.jar()
        await request("",{
            method:"GET",
            followAllRedirects:true,
            jar: COOKIES[username]
        })

        const response = await request("/user/login_check",{
            method:"POST",
            followRedirects:false,
            jar: COOKIES[username],
            form: {
                _username: encodeURI(username),
                _password: encodeURI(password) 
            }
        })

        if(response.error){
            reject(response.error)
            return
        }
       
        if(response.response.statusCode == 401){
            reject(new Error("AuthFailed"))
            return
        }

        
        let $ = cheerio.load(response.body)
        let potential = undefined
        
        try{
            potential = $("body a").text()
        }catch{

        }

        if(potential != "https://adminpanel.selfiestar.tv/"){
            resolve(false)
            return
        }

        resolve(true)
    })
}

function getProfiles(username){
    return new Promise(async (resolve,reject)=>{
        if(typeof(COOKIES[username]) == 'undefined'){
            COOKIES[username] = postmanRequest.jar()
            resolve(false)
            return
        }

        let response = await request("/chat/profile",{
            jar: COOKIES[username]
        })

        if(response.error){
            reject(response.error)
            return
        }
       
        if(response.response.statusCode == 401){
            reject(new Error("AuthFailed"))
            return
        }


        let potential = false
        
        try{
            potential = JSON.parse(response.body)
        }catch{

        }

        resolve(potential)
    })
}

function getProfileContent(username , profileID){
    return new Promise(async (resolve,reject)=>{
        if(typeof(COOKIES[username]) == 'undefined'){
            COOKIES[username] = postmanRequest.jar()
            resolve(false)
            return
        }

        let response = await request(`/chat/getProfileContent/${profileID}`,{
            jar: COOKIES[username]
        })

        if(response.error){
            reject(response.error)
            return
        }
       
        if(response.response.statusCode == 401){
            reject(new Error("AuthFailed"))
            return
        }


        let potential = false
        
        try{
            potential = response.body
        }catch{

        }

        resolve(potential)
    })
}

function getUsers(username , profileID , type , clientPage){
    let url = [ 
        `/chat/usersearch/${clientPage}?username=&language=DE&registeredAtStart=&registeredAtEnd=`,
        `/chat/chats/${profileID}?items=sender&page=${clientPage}`,
        `/chat/subscribers/${profileID}`,
        `/chat/visitors/${profileID}`

    ];

    return new Promise(async (resolve,reject)=>{
        if(typeof(COOKIES[username]) == 'undefined'){
            COOKIES[username] = postmanRequest.jar()
            resolve(false)
            return
        }

        let response = await request(url[type],{
            jar: COOKIES[username]
        })

        if(response.error){
            reject(response.error)
            return
        }
       
        if(response.response.statusCode == 401){
            reject(new Error("AuthFailed"))
            return
        }


        let potential = false
        
        try{
            potential = JSON.parse(response.body)
        }catch{

        }

        resolve(potential)
    })
}
function getMessages(username , profileID , userID){
    return new Promise(async (resolve,reject)=>{
        if(typeof(COOKIES[username]) == 'undefined'){
            COOKIES[username] = postmanRequest.jar()
            resolve(false)
            return
        }

        let response = await request(`/chat/chats/${profileID}/${userID}/1/`,{
            jar: COOKIES[username]
        })

        if(response.error){
            reject(response.error)
            return
        }
       
        if(response.response.statusCode == 401){
            reject(new Error("AuthFailed"))
            return
        }


        let potential = false
        
        try{
            potential = response.body
        }catch{

        }

        resolve(potential)
    })
}
function sendMessage(username , profileID , userID , message){
    return new Promise(async (resolve,reject)=>{
        if(typeof(COOKIES[username]) == 'undefined'){
            COOKIES[username] = postmanRequest.jar()
            resolve(false)
            return
        }

        let response = await request(`/chat/chats/${profileID}/${userID}`,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            followAllRedirects:true,
            jar: COOKIES[username],
            form:{
                message : message.trim()
            }
        })

        if(response.error){
            reject(response.error)
            return
        }
       
        if(response.response.statusCode == 401){
            reject(new Error("AuthFailed"))
            return
        }


        let potential = false
        
        try{
            potential = response.body
        }catch{

        }

        resolve(potential)
    })
}

app.all("*",(req,res,next)=>{
    try{
        if(req.header('authToken') == undefined){
            throw Error("error")
        }
        let user = JWS.verify(req.header('authToken'),JWS_SECRET)
        req.local_data = user
    }catch(err){
        
    }
    next()
})

app.post('/auth', (req, res) => {
    COOKIES[req.body['user']] = undefined
    auth(req.body['user'],req.body['password']).then(result=>{
    if(result){
      res.send('1')
    }else{
      res.send('0')
    }
  })
  
})
app.get('/get_profiles', (req, res) => {
  getProfiles(req.local_data['chat_username']).then(response=>{
    res.send(response)
  })
})

app.get('/get_profile_content/:profileID', (req, res) => {
    getProfileContent(req.local_data['chat_username'] , req.params['profileID'] ).then(response=>{
        res.send(response)
    })
})

app.get('/get_users/:type/:profileID', (req, res) => {

    getUsers(req.local_data['chat_username']  , req.params['profileID'] , req.params['type'] , req.query["clientPage"]).then(response=>{
        res.send(response)
    })
})

app.get('/get_messages/:profileID/:userID', (req, res) => {

    getMessages(req.local_data['chat_username']  , req.params['profileID'] , req.params['userID'] ).then(response=>{
        res.send(response)
    })
})
app.post('/send_messages/:profileID/:userID', (req, res) => {
    sendMessage(req.local_data['chat_username']  , req.params['profileID'] , req.params['userID'] , req.body.msg ).then(response=>{
        console.log(response)
        res.send(response)
    })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})