/**
 * Created by winter on 2015/1/18.
 */
var DOM={};
//获取ele所在元素位置索引
DOM.getIndex=function(nEle){
    var n=0;
    var prev=nEle.previousSibling;
    while(prev)
    {
        if(prev.nodeType===1)
        {
            n++;
        }
        prev=prev.previousSibling;
    }
    return n;
};

//获取ele的所有兄弟节点
DOM.siblings=function(nEle){
    var nodes=nEle.parentNode.childNodes;
    var a=[];
    for(var ii=0;ii<nodes.length;ii++)
    {
        if(nodes[ii].nodeType===1&&nodes[ii]!=nEle)
        {
            a.push(nodes[ii]);
        }
    }
    return a;
};

//获得ele所有哥哥
DOM.prevSiblings=function(ele){
    var a=[];
    var prev=ele.prevSiblings;
    while(prev)
    {
        if(prev.nodeType===1)
        {
            a.push(prev);
        }
        prev= prev.prevSiblings;
    }
    return a;
};

//获得ele所有弟弟
DOM.nextSiblings=function(ele){
    var a=[];
    var next=ele.nextSibling;
    while(next)
    {
        if(next.nodeType===1)
        {
            a.push(next);
        }
        next= next.nextSibling;
    }
    return a;
};

//获得ele相邻的第一个哥哥元素
DOM.prev=function(ele){
    if(ele.previousElementSibling)
    {
        return ele.previousElementSibling;
    }
    var p=ele.previousSibling;
    while(p)
    {
        if(p.nodeType===1)
        {
            return p;
        }
        p=ele.previousSibling;
    }
    return null;
};

//获得ele相邻的第一个弟弟元素
DOM.next=function(ele){
    if(ele.nextElementSibling)
    {
        return ele.nextElementSibling;
    }
    var n=ele.nextSibling;
    while(n)
    {
        if(n.nodeType===1)
        {
            return n;
        }
        n=ele.nextSibling;
    }
    return null;
};

//获得指定标签的子元素
DOM.children=function(parent,tagName)
{
  var childNodes=parent.childNodes;
    var a=[];
    if(tagName===undefined)
    {
        for(var i=0;i<childNodes.length;i++)
        {
            var child=childNodes[i];
            if(child.nodeType===1)
            {
                a.push(child);
            }
        }
    }
    else if(typeof tagName=="string")
    {
        for(var i2=0;i2<childNodes.length;i++)
        {
            var child2=childNodes[i2];

            //child.nodeName,child.tagName都是大写。
            // nodeName属性所有的节点都有。元素节点输出他的标签名(大写)。
            //其他类型的节点输出“#+节点类型”；
            //但是tagName这个属性只有元素节点才有。
            tagName=tagName.toUpperCase();
            if(child2.nodeType===1 &&child2.nodeName==tagName)
            {
                a.push(child2);
            }
        }
    }
    else
    {
        throw new Error("第二个参数类型错误");
    }
    return a;
};

DOM.children2=function(parent,tagName){
  var childNodes=parent.childNodes;
    if(typeof tagName=="undefined")
    {
        var reg=/^[A-Z]\w*$/;//没有传第二个参数，则表示把任意子元素都取到，所以这是一个很宽泛的正则
    }
    else if(typeof  tagName=="string")
    {
         reg=new RegExp("^"+tagName.toUpperCase()+"$");
    }
    var a=[];
    for(var i=0;i<childNodes.length;i++)
    {
        var child=childNodes[i];
        if(reg.test(child.nodeName))
        {
            a.push(child);
        }

    }
    return a;
};

DOM.byClass=function(eles,tagName){

    var reg=new RegExp("(?:^| )+"+tagName+"(?: |$)");
    var a=[];
    for(var i=0;i<eles.length;i++)
    {
        var nodes=eles[i];
        if(reg.test(nodes.className))
        {
            a.push(nodes);
        }
    }
    return a;
};

DOM.getElesByChass=function(classname,context){

    context=context||document;
    if(context.getElementsByClassName)
    {
        return context.getElementsByClassName(classname);
    }

    var eles=context.getElementsByTagName("*");
    classname=classname.replace(/^ +| +$/g,"");
    var strArr=classname.split(/ +/g);

    for(var i=0;i<strArr.length;i++)
    {
        var a=[];
        var reg=new RegExp("(?:^| )+"+strArr[i]+"(?: |$)");
        for(var j=0;j<eles.length;j++)
        {
            var nodes=eles[j];
            if(reg.test(nodes.className))
            {
                a.push(nodes);
            }
        }
        eles=a;
    }
    return eles;
};

DOM.addClass=function(ele,strClass){
    var reg=new RegExp("(?:^| )+"+strClass+"(?: |$)");
    if(!reg.test(ele.className))
    ele.className+=" "+strClass;
};

DOM.removeClass=function(ele,strClass){
    var reg=new RegExp("(?:^| )+"+strClass+"(?: |$)","g");
    ele.className=ele.className.replace(reg,"");
};

/*
* 获取浏览器的名称和版本号
* “webkit”：Safari或Chorme；版本号是Webkit的版本号
* “opera”：Opera；版本号就是软件的版本号
* “mozilla”：Firefox或者其他给予gecko内核的浏览器；版本号是Gecko的版本号
* “msie”：IE；版本号就是软件的版本
* 比如FireFox 3.6 返回：{name:"mozilla",version:"1.9.2"}
* */
DOM.brower=function(){
    var s=navigator.userAgent.toLowerCase();
    var match=/(webkit)[ \/]([\w.]+)/.exec(s) ||
        /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(s)||
        /(msie) ([\w.]+)/.exec(s)||
        !/compatible/.test(s)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(s)||[];
    return {name:match[1]||"",version:match[2] ||"0"};
};