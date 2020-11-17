let server = "http://178.20.100.110:8000"
let appVersion = "2.0.1"
let proxyServer = "http://178.20.100.110:9000"
let AuthToken = document.querySelector("#token").value;
let Profiles = {}
let Status = {}
let ProfileChange = true
let Profile = function(id,username){
    this.objectId = id 
    this.username = username
    this.clienttype = 0; 
    this.text = "";
    this.textId = ""
    this.photos ;
    this.timer = new Timer(this.objectId)
    this.clients = {
        loading:false,
        clientPage:1,
        clients:[]
    }
    this.getClients = function(id = this.objectId ){

        return new Promise(function(resolve,reject){
            let url = [ 

                `/get_users/0/${id}?clientPage=${Profiles[id].clients.clientPage}`,
                `/get_users/1/${id}?clientPage=${Profiles[id].clients.clientPage}`,
                `/get_users/2/${id}?clientPage=${Profiles[id].clients.clientPage}`,
                `/get_users/3/${id}?clientPage=${Profiles[id].clients.clientPage}`
            ];

            Profiles[id].clients.loading = true;
            fetch(proxyServer+url[Profiles[id].clienttype] , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': AuthToken
                }
            }).then(function(response){
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error
                }
            }).then( function(response) {
                console.log(response)
                response.forEach(client=>{
                    Profiles[id].clients.clients.push({
                        objectId : client.objectId,
                        username : client.username,
                        lastseen : client.lastTimeOnline.iso,
                        rejects:[]
                    })
                })

                Profiles[id].clients.clientPage++;
                Profiles[id].clients.loading = false;
                Profiles[id].timer.resume()
                resolve() ;
            })
        })
    }
}


let Timer = function(id) {
    this.profileId = id
    this.status = 'stoped'

    var timerId, start, remaining ;

    this.pause = function() {
        clearTimeout(timerId);
        remaining -= Date.now() - start;
        this.status = 'paused'
    };

    this.wait = function(){
        this.pause()
        this.status = 'waiting'
    }

    this.resume = function() {
        start = Date.now();
        clearTimeout(timerId);
        timerId = setTimeout(sendmsg, remaining,this.profileId);
        this.status = 'running'
        console.log("timerstarted")
    };

    this.start = function(time){

        remaining = time;
        this.status = 'running'
        this.resume();
    }
    this.stop = function(){
        this.status = 'stoped'
        Profiles[id].clients.clientPage = 1;
        Profiles[id].clients.clients = []
        Profiles[id].text = ""
        Profiles[id].textId = ""
        Profiles[id].photos.forEach((photo,i)=>{
            Profiles[id].photos[i].selected = false
            Profiles[id].photos[i].price = 0
        })
        clearTimeout(timerId);
    }
};


function get_view(){

    return new Promise(async (resolve,reject)=>{

        if(Object.keys(Profiles).length == 0 || ProfileChange == true){
            let response = await fetch(proxyServer+'/get_profiles' , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken':AuthToken
                }
            })

            let profiles = await response.json()

            let promises = []


            profiles.forEach( profile => {
                promises.push(fetch(proxyServer+'/get_profile_content/'+profile.objectId , {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'authToken':AuthToken
                        }
                    }).then(async function(response){
                        if (response.status == 200) {
                            return response.json()
                        } else {
                            var error = new Error(response.statusText);
                            error.response = response;
                            throw error
                        }
                    })
                )
                
                Profiles[profile.objectId] = new Profile(profile.objectId,profile.username)
                ProfileChange = false;   
            })

            let profileContents = await Promise.all(promises)
            profileContents.forEach(profileContent=>{

                let photos = []
                profileContent.images.forEach((photo,i)=>{
                    photos.unshift({
                        selected:false,
                        name:photo.image.name,
                        url:photo.image.url,
                        price:0
                    })
                })
                Profiles[profileContent.profileId].photos = photos
                
            })

            let statusReq = await fetch(server+'/getStatus' , {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'authToken':AuthToken
                },
                body:JSON.stringify({profiles:Profiles})
            })
            
            Status = await statusReq.json()
            console.log(Status)
            resolve(getStatus())
        }else{
            resolve(getStatus())
        }
    })

    
}
function getStatus(){
    if(Object.keys(Status) == 0){
        return 
    }

    let data = {
        data:[],
        max_msg_profile:Status.max_msg_profile,
        min_text_len: Status.min_text_len
    }

    Object.keys(Profiles).forEach(id=>{
        data.data.push({
            status:Profiles[id].timer.status,
            objectId:id,
            username:Profiles[id].username,
            text:Profiles[id].text,
            clienttype:Profiles[id].clienttype,
            msgSent: Status.profiles_today[id],
            photos:Profiles[id].photos
        })
    })
    return data

}

async function start(id , text , clienttype, sphoto ){
    if(sphoto.selected && sphoto.price<0){
        return "Preis muss eine positive zahl sein!"
    }
    if(sphoto.selected && sphoto.url == "/public/images/placeholder.png"){
        return "Bitte Foto auswählen!"
    }
    

    let checktextResponse = await fetch(server+'/checktext' , {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'authToken' : AuthToken
        },
        body:JSON.stringify({
            text:text,
            profile:id,
            photo: sphoto.selected,
            appVersion: appVersion
        })
    })

    let checktext = await checktextResponse.text()

    if(Status.max_msg_profile > Status.profiles_today[id]){
        if(checktextResponse.status == 200){
            if(sphoto.selected){
                Profiles[id].photos.forEach((photo , i )=>{
                    Profiles[id].photos[i].selected = false;
                    if(Profiles[id].photos[i].url == sphoto.url){
                        Profiles[id].photos[i].selected = true
                        Profiles[id].photos[i].price = sphoto.price
                    }
                })
            }
            Profiles[id].text = text;
            Profiles[id].textId = checktext
            Profiles[id].clienttype = clienttype;
            Profiles[id].timer.start(20)
            return true
        }else{
            return checktext
        }
    }else{
        return "Maximale Anzahl von Nachrichten überschritten!"
    }
    
}

async function sendmsg(id){

    if(Profiles[id].clients.clients.length == 0 ){

        console.log("no clients")
        if(Profiles[id].clients.loading != true){
            Profiles[id].clients.loading = true
            Profiles[id].getClients();
        }

        Profiles[id].timer.wait();  
        return 
    }
    

    let client = Profiles[id].clients.clients[0]
    Profiles[id].clients.clients.shift()


    let unresponded = 0
    

    let response = await fetch(proxyServer+`/get_messages/${id}/${client.objectId}`,{
        headers: {
            'Content-Type':'application/json',
            'authToken' : AuthToken
        }
    });
    let data = await response.json()
    console.log(data.length)

    if(data.length != 0){
        for (let i = 0; i < data.length; i++) {
            let msg = data[i]
            if(data[i].partner1 == id){
                unresponded ++;
            }else{
                break
            } 
        }
    }
    
      


    if(Profiles[id].clienttype != 1 && data.length != 0){
        Profiles[id].timer.start(20)
        return     
    } 

    let containsPhoto = false

    Profiles[id].photos.forEach(photo=>{
        if(photo.selected){
            containsPhoto = true
        }
    })
    
    

    fetch(server+'/checkmsg' , {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'authToken' : AuthToken
        },
        body:JSON.stringify({client:client,profile:Profiles[id],containsPhoto:containsPhoto,unresponded:unresponded})
    })
    .then(async function(response){
        return {status:response.status , body:await response.json()}
    }).then(function(res) {
        if(res.status == 200){
            if(res.body.allowed == 1){
                Status.profiles_today[id]++;
                console.log(Profiles[id].text);
                fetch(proxyServer+`/send_messages/${id}/${client.objectId}/`, { 
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type':'application/json',
                        "authToken":AuthToken
                    },
                    body: JSON.stringify({msg : Profiles[id].text}) 
                }).then(async function(response){
                    return {status:response.status , body:await response.text()}
                }).then(function(res) {
                    if(res.status == 200)
                        console.log(`Success`)
                }).catch((e)=>{
                    console.log(e)
                })



                // Profiles[id].photos.forEach(async photo=>{
                //     if(photo.selected){
                //         let form = new FormData()
                //         form.append("currencyUnits",photo.price == 0 ? -1 : photo.price)
                //         let photo_req = await fetch(photo.url)
                //         let photo_blob = new Blob([await photo_req.arrayBuffer()]);
                //         form.append("file",photo_blob,photo.name)
                //         fetch(`https://adminpanel.selfiestar.tv/chat/uploadImage/${id}/${client.objectId}`, {
                //             headers:{
                //                 "mode": "no-cors"
                //             },
                //             credentials: 'include',
                //             method: 'POST',
                //             body: form
                //         }).then(async function(response){
                //             return {status:response.status , body:await response.text()}
                //         }).then(function(res) {
                //             if(res.status == 200)
                //                 return
                //         }).catch((e)=>{
                //             console.log(e)
                //         })
                //     }
                // })

                

                
            }
            console.log(res.body)
            if(res.body.continue == 1){
                Profiles[id].timer.start(res.body.next * 1000)
            }else{

            }

            if(res.body.reroll == 1 && Profiles[id].clienttype == 0 ){
                Profiles[id].clients.clients = []
                Profiles[id].clients.clientPage = 1 ; 
            }

        }else{
            Profiles[id].timer.start(20)
        }
    })
}

function pause(data){
    Profiles[data.profileId].timer.pause()
    return true
}

function resume(data){
    Profiles[data.profileId].timer.resume()
    return true
}

async function CheckProfile(){
    if(Object.keys(Profiles).length != 0){
        let response = await fetch(proxyServer+'/get_profiles' , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken':AuthToken
            }
        })

        let profiles = await response.json()
        
        let actProfile = Object.keys(Profiles) ;
        let newProfiles = []
        response.forEach(profile => {
            newProfiles.push(profile.objectId)
        })

        if(actProfile.join("") == newProfiles.join("")){
            ProfileChange == false
            return
        }else{
            Object.keys(Profiles).forEach(id=>{
                Profiles[id].timer.stop()
            })
            Profiles = {}
            ProfileChange == true
        }              
    }
}

function online(){
    fetch(server+'online' , {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'authToken' : AuthToken
        }
    })
}


async function init(){
    let result = await get_view() 
    console.log(result)
    if(!result){
        setTimeout(init , 500)
        return
    }


    result.data.forEach(profile => {
        let tab = document.getElementById("tab_model").cloneNode({deep:true})
        tab.setAttribute('profileId',profile.objectId)
        tab.removeAttribute("style")
        tab.removeAttribute("id")
        
        tab.querySelector("a").setAttribute('href',`#profile_${profile.objectId}`)
        document.querySelector("#myTab").append(tab)



        let tabContent = document.getElementById("tab_content_model").cloneNode({deep:true})
        tabContent.removeAttribute("style")
        tabContent.setAttribute("status",profile.status)
        tabContent.setAttribute('id',`profile_${profile.objectId}`)
        tabContent.querySelector("select").value = profile.clienttype
        tabContent.querySelector("textarea").value = profile.text
        tabContent.querySelector(".msg-max").innerHTML = result.max_msg_profile 
        tabContent.querySelector(".msg-today").innerHTML = profile.msgSent
        tabContent.querySelector(".text-len").innerHTML = profile.text.length+"/"+result.min_text_len
        tabContent.querySelector("textarea").addEventListener("keyup", (e )=>{
            e.target.value = e.target.value.replace(/\s+/g,' ')
            document.querySelector(`.text-len[profileId='${profile.objectId}']`).innerHTML = e.target.value.length+"/"+result.min_text_len
            if(e.target.value.length >= result.min_text_len ){
                document.querySelector(`[profileId='${profile.objectId}'][class*='button-start']`).disabled = false
            }else{
                document.querySelector(`[profileId='${profile.objectId}'][class*='button-start']`).disabled = true
            }
        })
        tabContent.querySelectorAll("[profileId='']").forEach(e=>{
            e.setAttribute('profileId',profile.objectId)
        })
        tabContent.querySelector(`[profileId='${profile.objectId}'][class*='button-start']`).addEventListener("click", async (e )=>{
            let data = {
                profileId: e.target.getAttribute("profileId"),
                text: document.querySelector(`textarea[profileId='${profile.objectId}']`).value,
                clienttype: document.querySelector(`select[profileId='${profile.objectId}']`).value,
                photo:{
                    selected : document.querySelector(`#photo_checkbox_${profile.objectId}`).checked ? true : false,
                    url: document.querySelector(`img[profileId='${profile.objectId}']`).getAttribute("src"),
                    price: document.querySelector(`[profileId='${profile.objectId}'][class*='photo-price']`).value
                }
            }
            let result = await start(data.profileId,data.text,data.clienttype,data.photo )
            
   
            if(result == true){
                e.target.disabled = true;
                document.querySelector(`[href *='#profile_${profile.objectId}']`).innerHTML = profile.username + `<img width="9px" src="/public/images/running.svg" alt="">`
                document.querySelector(`[profileId='${profile.objectId}'][class*='button-pause']`).disabled = false
                document.querySelector(`[profileId='${profile.objectId}'][class*='button-stop']`).disabled = false
                document.querySelector(`select[profileId='${profile.objectId}']`).disabled = true
                document.querySelector(`textarea[profileId='${profile.objectId}']`).disabled = true
                document.querySelector(`#photo_checkbox_${profile.objectId}`).disabled = true
                document.querySelector(`[profileId='${profile.objectId}'][class*='photo-price']`).disabled = true
                document.querySelector(`[profileId='${profile.objectId}'][class*='modal-button']`).disabled = true
                
            }else{
                alert(result)
            }                 
                    

            
                
        })
        tabContent.querySelector(`[profileId='${profile.objectId}'][class*='button-stop']`).addEventListener("click", (e )=>{
            if(profile.status !="paused"){
                let data = {
                    profileId: e.target.getAttribute("profileId")
                }
                let result = Profiles[data.profileId].timer.stop()
                
                if(true){
                    e.target.disabled = true;
                    document.querySelector(`[href *='#profile_${profile.objectId}']`).innerHTML = profile.username + `<img width="9px" src="/public/images/stoped.svg" alt="">`
                    document.querySelector(`textarea[profileId='${profile.objectId}']`).value = ""
                    document.querySelector(`[profileId='${profile.objectId}'][class*='button-pause']`).disabled = true
                    document.querySelector(`[profileId='${profile.objectId}'][class*='button-start']`).disabled = false
                    document.querySelector(`select[profileId='${profile.objectId}']`).disabled = false
                    document.querySelector(`textarea[profileId='${profile.objectId}']`).disabled = false
                    document.querySelector(`#photo_checkbox_${profile.objectId}`).disabled = false
                    document.querySelector(`#photo_checkbox_${profile.objectId}`).checked = false
                    document.querySelector(`[profileId='${profile.objectId}'][class*='photo-price']`).disabled = false
                    document.querySelector(`[profileId='${profile.objectId}'][class*='photo-price']`).value = 0
                    document.querySelector(`[profileId='${profile.objectId}'][class*='modal-button']`).disabled = false
                    
                }else{
                    alert(result)
                } 
            }

        })

        
        


        ///////////
        
        tabContent.querySelector("#photo_checkbox_model").setAttribute('id',`photo_checkbox_${profile.objectId}`)
        tabContent.querySelector(`#photo_checkbox_${profile.objectId}`).parentElement.querySelector("label").setAttribute('for',`photo_checkbox_${profile.objectId}`)
       

        
        
        tabContent.querySelector(`[class*='modal-button']`).setAttribute("data-target",`#photoModal_${profile.objectId}`)

        let photoModal = tabContent.querySelector("#photoModal_model")
        photoModal.setAttribute('id',`photoModal_${profile.objectId}`)
        photoModal.removeAttribute("style")
        
        profile.photos.forEach(photo =>{
            let img = photoModal.querySelector("#photo_model").cloneNode({deep:true})
            img.removeAttribute("style")
            img.removeAttribute("id")
            img.querySelector(`img`).setAttribute('src',photo.url)
            img.querySelector(`img`).addEventListener("click" , (e)=>{
                e.preventDefault()
                let url = e.target.getAttribute("src")
                document.querySelector(`[profileId='${profile.objectId}'][class*='photo_url']`).setAttribute("src",url)
                $(`#photoModal_${profile.objectId}`).modal('hide')
            })
            photoModal.querySelector(".modal-body").append(img)
        })
        photoModal.querySelector("#photo_model").remove()
        
        profile.photos.forEach(photo=>{
            if(photo.selected){
                tabContent.querySelector(`#photo_checkbox_${profile.objectId}`).checked = true
                tabContent.querySelector('img').setAttribute('src',photo.url)
                tabContent.querySelector(`[profileId='${profile.objectId}'][class*='photo-price']`).value = photo.price
            }
        })









        if(profile.status =="running" || profile.status == "waiting"){
            document.querySelector(`[href *='#profile_${profile.objectId}']`).innerHTML = profile.username + `<img width="9px" src="/public/images/running.svg" alt="">`
            tabContent.querySelector(`textarea`).disabled = true
            tabContent.querySelector(`select`).disabled = true
            tabContent.querySelector(`[class*='button-start']`).disabled = true
            tabContent.querySelector(`[class*='button-pause']`).disabled = false
            tabContent.querySelector(`[class*='button-stop']`).disabled = false
            tabContent.querySelector(`#photo_checkbox_${profile.objectId}`).disabled = true
            tabContent.querySelector(`[profileId='${profile.objectId}'][class*='photo-price']`).disabled = true
            tabContent.querySelector(`[profileId='${profile.objectId}'][class*='modal-button']`).disabled = true
        }

        if(profile.status =="paused"){
            tabContent.querySelector(`textarea`).disabled = true
            tabContent.querySelector(`select`).disabled = true
            tabContent.querySelector(`[class*='button-start']`).disabled = false
            tabContent.querySelector(`[class*='button-pause']`).disabled = true
            tabContent.querySelector(`[class*='button-stop']`).disabled = false
            tabContent.querySelector(`#photo_checkbox_${profile.objectId}`).disabled = true
            tabContent.querySelector(`[profileId='${profile.objectId}'][class*='photo-price']`).disabled = true
            tabContent.querySelector(`[profileId='${profile.objectId}'][class*='modal-button']`).disabled = true
        }
        if(profile.status =="stoped" ){
            document.querySelector(`[href *='#profile_${profile.objectId}']`).innerHTML = profile.username + `<img width="9px" src="/public/images/stoped.svg" alt="">`
            tabContent.querySelector(`textarea`).disabled = false
            tabContent.querySelector(`select`).disabled = false
            tabContent.querySelector(`[class*='button-start']`).disabled = true
            tabContent.querySelector(`[class*='button-pause']`).disabled = true
            tabContent.querySelector(`[class*='button-stop']`).disabled = true
            tabContent.querySelector(`#photo_checkbox_${profile.objectId}`).disabled = false
            tabContent.querySelector(`[profileId='${profile.objectId}'][class*='photo-price']`).disabled = false
            tabContent.querySelector(`[profileId='${profile.objectId}'][class*='modal-button']`).disabled = false
        }

        document.querySelector("#myTabContent").append(tabContent)

    });
    setInterval(async ()=>{
        let result = await get_view()
        console.log(result)
        if( typeof(result) != "object"){
            return
        }

        result.data.forEach(profile =>  {
            document.querySelector(`[profileId='${profile.objectId}'][class*='msg-today']`).innerHTML = profile.msgSent
        });
        return
    },20000)

        
    
}


setInterval(()=>{
    let promises = []
    let stars = 0;

    if(!ProfileChange && AuthToken){
        Object.keys(Profiles).forEach(profile =>{
            console.log(profile)
            promises.push(fetch(proxyServer+`/get_profile_content/${profile}` , {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken' : AuthToken
                    }
                }).then(async function(response){
                    if (response.status == 200) {
                        return response.json()
                    } else {
                        var error = new Error(response.statusText);
                        error.response = response;
                        throw error
                    }
                })
            )    
        })
    
        Promise.all(promises).then(profileContents =>{
            profileContents.forEach(profileContent=>{
                stars += parseInt(profileContent.exchangeableStars) 
            })
            fetch(server+'/stars' , {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'authToken' : AuthToken
                },
                body:JSON.stringify({
                    stars:stars
                })
            })
            fetch(server+'/online' , {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'authToken' : AuthToken
                },
                body:JSON.stringify({
                    stars:stars
                })
            })
        })
    }
    
},30000)
init()



