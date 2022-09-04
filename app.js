/// 서버

var moment = require('moment'); // moment.js 사용하기

const express=require("express")
const http = require("http")
const app=express()
const path=require("path")
const server = http.createServer(app)
const socketIO=require("socket.io")

const io=socketIO(server)

app.use(express.static(path.join(__dirname, "src")))

const PORT = process.env.PORT || 5000


io.on("connection",(socket)=>{
    ///console.log('연결이 이루어 졌습니다')
    socket.on("chatting",(data)=>{
        const{name, msg}=data //deconstructure

        io.emit("chatting",{ //,data 였는데 쪼개서 object로 보내기
            name:name, //그냥 name, 이렇게 해도됨
            msg:msg,
            time:moment().format("hh:mm")
        })
    })
})
 
server.listen(PORT, () =>console.log(`server is running ${PORT}`)) 