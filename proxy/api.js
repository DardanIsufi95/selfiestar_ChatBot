const postmanRequest = require("postman-request")
const cheerio = require('cheerio');


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

function chectAuth(username){
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
        
        if(typeof(COOKIES[username]) == 'undefined'){
            COOKIES[username] = postmanRequest.jar()
        }

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
            potential = JSON.parse(response.body)
        }catch{

        }

        resolve(potential)
    })
}

auth("mt48@selfiestar.de","faxx5050").then(res1=>{
    getProfiles("mt48@selfiestar.de").then(res2=>{
        console.log(res2)
    })
})