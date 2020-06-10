
//发送按钮 send-btn
var sb = document.querySelector(".send-btn")
//聊天内容元素 chat-content
var chatContent = document.querySelector(".chat-content")
//左消息块 content-block
var cbl = document.querySelector(".content-block-left")
//右消息块
var cbf = document.querySelector(".content-block-right")


function sendMessage() {
    //文本框元素 content-input
    var ci = document.querySelector(".content-input");
    if (ci.value == null ||ci.value==''|| ci.value == "\n") {
        setTimeout(function(){
            ci.value=""
        },1)

        return;
    }
    //克隆右消息块
    var rightblock = cbf.cloneNode(true)
    rightblock.querySelector(".head-sculpture-right").onclick=skipurl2
    rightblock.style.display = "block"
    rightblock.querySelector(".message-right").innerHTML = ci.value
    chatContent.appendChild(rightblock)
    ci.value =""
    getReply(ci.value)
    //使滚动条滚到最底部
    chatContent.scrollTop = chatContent.scrollHeight
    setTimeout(function(){
        ci.value=""
    },100)
}
function skipurl2(){
    window.open("https://weibo.com/u/5627963349?is_all=1","_blank")
}
//按键center事件
window.onkeydown = function (e) {
    if (e.keyCode == 13) {
        this.sendMessage()
    }
}
//点击事件
sb.onclick = function () {
    sendMessage()
}

function process(json){
    //克隆左消息块
    var leftblock = cbl.cloneNode(true)
    leftblock.querySelector(".head-sculpture-left").onclick = skipurl
    leftblock.style.display = "block"
    leftblock.querySelector(".message-left").innerHTML = json["text"];
    chatContent.appendChild(leftblock)
    //使滚动条滚到最底部
    chatContent.scrollTop = chatContent.scrollHeight
}
function skipurl() {
    window.open("http://www.turingapi.com/","_blank")
}
//获取回复
function getReply(info) {
    url = "http://www.tuling123.com/openapi/api"
    $.post(url, {
        info: info,
        key: "ddb9c8cc14dd44559ac6820610331201"
    }, function (json) {
        if(json!=null){
            console.log(json)
            process(json)
        }

    })
}


window.onload = function () {
    //使滚动条滚到最底部
    chatContent.scrollTop = chatContent.scrollHeight
    setTimeout(function(){
        cbl.style.display = "block"
    },1000)
}