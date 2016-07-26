/**
 * Created by winter on 2015/2/7.
 */
/*
* 基本事件库，处理二级事件兼容性问题
* */
var Event={};

Event.on=function (ele,type,fn)
{
    this.ele=ele;
    if(window.addEventListener)
    {
        ele.addEventListener(type,fn,false);
    }
    else{
        if(!ele["aEvent"+type])
        {
            ele["aEvent"+type]=[];
            ele.attachEvent("on"+type,function(){return Event.run.call(ele);});
        }
        var a=ele["aEvent"+type];
        for(var i=0;i< a.length;i++)
        {
            if(a[i]==fn)
            {
                return;
            }
        }
        a.push(fn);
    }
};
Event.run=function ()
    {
        var e=window.event;
        var type= e.type;
        e.target= e.srcElement;
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
        e.stopPropagation=function(){e.cancelBubble=true;};
        e.preventDefault=function(){e.returnValue=false;};
        var a=this["aEvent"+type];
        for(var i=0;i< a.length;) {
            if (typeof a[i] == "function")
            {
                a[i].call(this,e);
                i++
            }
            else
            {
                a.splice(i,1);
            }
        }
    };
Event.off=function (ele,type,fn)
    {

        if(ele.removeEventListener)
        {
            ele.removeEventListener(type,fn,false);
            return;
        }
        var a=ele["aEvent"+type];
        //console.log(ele.innerHTML);
        for(var i=0;i< a.length;i++)
        {
            if(a[i]==fn)
            {
                a[i]=null;
            }
        }
    };
Event.processThis=function(obj,fn)
{
    return function(e){fn.call(obj,e);};
};