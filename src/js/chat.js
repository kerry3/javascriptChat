"use strict"
const socket=io();

const nickname=document.querySelector("#nickname")
const chatlist=document.querySelector(".chatting-list")
const chatinput=document.querySelector(".chatting-input")
const sendbutton=document.querySelector(".send-button")

sendbutton.addEventListener("click", ()=>{
    const param={
        name:nickname.value,
        msg:chatinput.value
    }
    socket.emit("chatting", param)
})

socket.on("chatting", (data)=>{
    const li=document.createElement("li");
    li.innerText=`${data.name}님이 - ${data.msg}`;
    chatlist.appendChild(li)
})

///console.log(socket)