window.onload = function () {
    imgLocation("container","box");
    var imgData = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},]};
    window.onscroll = function () {
        if(checkFlag()){
            var cparent = document.getElementById("container");
            for( var i=0;i<imgData.data.length;i++){
                var ccontent = document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);
                var boximg = document.createElement("div");
                boximg.className = "box_img";
                ccontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src = "img/"+imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}

function checkFlag() {
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    var lastcontentHeight = ccontent[ccontent.length - 1].offsetTop;
    //console.log(lastcontentHeight);
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    //console.log(scrollTop);
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    //console.log(lastcontentHeight+":"+scrollTop+":"+pageHeight);
    if(lastcontentHeight<scrollTop+pageHeight){
        return true;
    }

}
function imgLocation(parent, content) {
    //将partent下多有的content全部取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent,content);
    var imgwidth = ccontent[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth/imgwidth);
    cparent.style.cssText = "width:"+ imgwidth*num+"px;margin:0 auto";

    var boxHeightArr = [];
    for(var i=0;i<ccontent.length;i++){
        if(i <num){
            boxHeightArr[i] = ccontent[i].offsetHeight;
            //console.log(boxHeightArr[i]);
        }else{
            var minHeight = Math.min.apply(null,boxHeightArr)
            //console.log(minHeight);
            var minindex = getminHeight(boxHeightArr,minHeight);
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minHeight+"px";
            ccontent[i].style.left = ccontent[minindex].offsetLeft+"px";
            boxHeightArr[minindex] = boxHeightArr[minindex]+ccontent[i].offsetHeight;
        }
    }
}
function getminHeight(boxHeightArr, minHeight) {
    for(var i in boxHeightArr){
        if(boxHeightArr[i]==minHeight){
            return i;
        }
    }
}

function getChildElement(parent,content) {
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");
    for(var i=0;i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}