"use strict"
const socket=io();

const nickname=document.querySelector("#nickname")
const chatlist=document.querySelector(".chatting-list")
const chatinput=document.querySelector(".chatting-input")
const sendbutton=document.querySelector(".send-button")
const displaycontainer=document.querySelector(".display-container")

function send() {
     // 대화명(nickname), 채팅내용(chatting input) 데이터 객체로 저장한다음에
     const param={
        name:nickname.value,
        msg:chatinput.value,
    }
    //서버로 데이터 발사
    socket.emit("chatting", param)
}

// 전송버튼 클릭했을 때
sendbutton.addEventListener("click", send) //여기선 send()라고하면 전송버튼이 먹통됨

function enterkey() {
	if (window.event.keyCode == 13) {
        send() //()안붙였더니 엔터쳐도 안되더라.. 근데 전송누르고 엔터누르니 됨
    }
}

// 서버로부터 data를 받았을때
socket.on("chatting", (data)=>{
    const{name,msg,time}=data
    const item=new LiModel(name, msg, time);
    item.makeLi()
    displaycontainer.scrollTo(0,displaycontainer.scrollHeight) //chatting-list로 하니 안됨 ul태그라 그런듯
})

function LiModel(name, msg, time){
    this.name=name;
    this.msg=msg;
    this.time=time;

    this.makeLi=()=>{
        const li=document.createElement("li" );
        li.classList.add(nickname.value===this.name ? "sent" : "received")
        // this.name->받은 이름, nickname.value->지금 내 대화명에 써있는 이름

        const dom= `            <span class="profile">
                                    <span class="user">${this.name}</span>
                                    <img class='image' src="http://placeimg.com/50/50/any" alt="any">
                                </span> 
                                <span class="message">${this.msg}</span>
                                <span class="time">${this.time}</span>`
        li.innerHTML=dom
        chatlist.appendChild(li)
    }
}

///console.log(socket)