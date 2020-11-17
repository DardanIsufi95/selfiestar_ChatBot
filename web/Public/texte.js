const socket = io(window.location.host);

socket.on("message",(data)=>{
    let tr = document.createElement("tr")
    tr.innerHTML = `
        <td>${data.name}</td>
        <td>${data.chat_username}</td>
        <td>${data.profile}</td>
        <td>${data.client}</td>
        <td>${data.timestamp}</td>
        <td>${data.text}</td>`
    document.querySelector("tbody").prepend(tr)
    let rows = document.querySelectorAll("tbody tr").length
    console.log(rows)
    if(rows > 20){
        document.querySelector("tbody tr:last-child").remove()
    }
    console.log(data)
})
