
document.getElementById("add_emp").addEventListener("click" , (e)=>{
    e.preventDefault()
    $('#user_new_modal').modal("show")
})

document.querySelectorAll(".edit_user").forEach(user=>{
    user.addEventListener("click" , (e)=>{
        e.preventDefault()
        let data = JSON.parse(e.target.getAttribute("data-json"))
        let modal = document.getElementById("user_edit_modal")
        modal.querySelector("#user_id").value = data["id"]
        modal.querySelector("#user_name").value = data["name"]
        modal.querySelector("#user_username").value = data["username"]
        modal.querySelector("#user_password").value = data["password"]
        modal.querySelector("#user_chat_username").value = data["chat_username"]
        modal.querySelector("#user_chat_password").value = data["chat_password"]
        modal.querySelector("#user_max_msg_profile").value = data["max_msg_profile"]
        modal.querySelector("#user_allow_photos_edit").checked = data["allow_photos"] ? true : false
        
        $('#user_edit_modal').modal("show")
    })
})
document.querySelectorAll(".del_user").forEach(user=>{
    user.addEventListener("click" , (e)=>{
        e.preventDefault()
        if (confirm(`Mochten sie diesen den User ${JSON.parse(e.target.getAttribute("data-json")).name} wirklich löschen`)) {
            console.log("delete")
            let data = {
                action:"delete",
                id: JSON.parse(e.target.getAttribute("data-json")).id
            }
            fetch("/admin/mitarbeiter" , {
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data)
            }).then(async function(response){
                if (response.status == 200) {
                    return {statuscode:response.status , data: await response.text()}
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error
                }
            }).then(function(response) {
                console.log(window.location.href)
                window.location.href = window.location.href;
            }).catch((e)=>{
                console.log(e)
            })
        } else {
            return
        }
        
        
    })
})

document.getElementById("save_new").addEventListener("click", (e)=>{
    let modal = document.getElementById("user_new_modal")
    let data = {
        action:"new",
        name: modal.querySelector("#user_name").value.length == 0 ? undefined : modal.querySelector("#user_name").value,
        username: modal.querySelector("#user_username").value.length == 0 ? undefined : modal.querySelector("#user_username").value,
        password: modal.querySelector("#user_password").value.length == 0 ? undefined : modal.querySelector("#user_password").value,
        chat_username: modal.querySelector("#user_chat_username").value.length == 0 ? undefined : modal.querySelector("#user_chat_username").value,
        chat_password: modal.querySelector("#user_chat_password").value.length == 0 ? undefined : modal.querySelector("#user_chat_password").value,
        max_msg_profile: modal.querySelector("#user_max_msg_profile").value.length == 0 ? undefined : modal.querySelector("#user_max_msg_profile").value,
        allow_photos: modal.querySelector("#user_allow_photos").checked ? 1 : 0
    }
    fetch("/admin/mitarbeiter" , {
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    }).then(async function(response){
        if (response.status == 200) {
            return {statuscode:response.status , data: await response.text()}
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }).then(function(response) {
        console.log(window.location.href)
        window.location.href = window.location.href;
    }).catch((e)=>{
        console.log(e)
    })
})

document.getElementById("save_update").addEventListener("click", (e)=>{
    let modal = document.getElementById("user_edit_modal")
    let data = {
        action:"update",
        id: modal.querySelector("#user_id").value.length == 0 ? undefined : modal.querySelector("#user_id").value,
        name: modal.querySelector("#user_name").value.length == 0 ? undefined : modal.querySelector("#user_name").value,
        username: modal.querySelector("#user_username").value.length == 0 ? undefined : modal.querySelector("#user_username").value,
        password: modal.querySelector("#user_password").value.length == 0 ? undefined : modal.querySelector("#user_password").value,
        chat_username: modal.querySelector("#user_chat_username").value.length == 0 ? undefined : modal.querySelector("#user_chat_username").value,
        chat_password: modal.querySelector("#user_chat_password").value.length == 0 ? undefined : modal.querySelector("#user_chat_password").value,
        max_msg_profile: modal.querySelector("#user_max_msg_profile").value.length == 0 ? undefined : modal.querySelector("#user_max_msg_profile").value,
        allow_photos: modal.querySelector("#user_allow_photos_edit").checked ? 1 : 0
    }
    fetch("/admin/mitarbeiter" , {
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    }).then(async function(response){
        if (response.status == 200) {
            return {statuscode:response.status , data: await response.text()}
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }).then(function(response) {
        console.log(window.location.href)
        window.location.href = window.location.href;
    }).catch((e)=>{
        console.log(e)
    })
})


document.getElementById("save_settings").addEventListener("click", (e)=>{
    let modal = document.getElementById("settings_modal")
    let data = {
        admin_username: modal.querySelector("#admin_username").value.length == 0 ? undefined : modal.querySelector("#admin_username").value,
        admin_password: modal.querySelector("#admin_password").value.length == 0 ? undefined : modal.querySelector("#admin_password").value,
        min_wait: modal.querySelector("#min_wait").value.length == 0 ? undefined : modal.querySelector("#min_wait").value,
        max_wait: modal.querySelector("#max_wait").value.length == 0 ? undefined : modal.querySelector("#max_wait").value,
        max_msg_client: modal.querySelector("#max_msg_client").value.length == 0 ? undefined : modal.querySelector("#max_msg_client").value,
        max_last_online: modal.querySelector("#max_last_online").value.length == 0 ? undefined : modal.querySelector("#max_last_online").value,
        text_min_len: modal.querySelector("#text_min_len").value.length == 0 ? undefined : modal.querySelector("#text_min_len").value,
        max_unbeantwortet: modal.querySelector("#text_min_len").value.length == 0 ? undefined : modal.querySelector("#max_unbeantwortet").value
    }
    fetch("/admin/settings" , {
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    }).then(async function(response){
        if (response.status == 200) {
            return {statuscode:response.status , data: await response.text()}
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }).then(function(response) {
        window.location.href = window.location.href;
    }).catch((e)=>{
        console.log(e)
    })
})


