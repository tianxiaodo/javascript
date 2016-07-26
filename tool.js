/*
* touchTap:
* by team on 20150322 tqd
* @parameter:null
* @return:null
* */
var touchTap=(function(){
    //检测当前设备是否支持touch事件
    var isSup=true,endEvent="touchend";
    !("createTouch" in document)? ( isSup=false,endEvent="click"):void 0;
    return {
        TouchStart:function(ele){
            ele.addEventListener("touchstart",function(e){

                var y= e.touches[0].clientY;
                this.setAttribute("x",e.touches[0].clientX);
                this.setAttribute("y",e.touches[0].clientY);
                this.setAttribute("isMove",false);
            },false);
        },
        TouchMove:function(ele){
            ele.addEventListener("touchMove",function(e){
                var cx=e.touches[0].clientX;
                var cy=e.touches[0].clientY;
                var x=this.getAttribute("x");
                var y=this.getAttribute("y");
                if(Math.abs(cx-x)>10||Math.abs(cy-y)>10)
                {
                    this.setAttribute("isMove",true);
                }
            },false);
        },
        TouchEnd:function(ele,callback){
            ele.addEventListener(endEvent,function(e){
               var isMove=this.getAttribute("isMove");
                if(isMove=="false")
               {
                   typeof callback=="function"?callback.call(this):void 0;
               }
            },false);
        },
        TouchCancel:function(ele){
            ele.addEventListener("touchcancel",function(){

            },false);
        },
        init:function(options){
            if(isSup)
            {
                this.TouchStart(options.ele);
                this.TouchMove(options.ele);
                this.TouchCancel(options.ele);
                this.TouchEnd(options.ele,options.callback);
            }
        }

    };

})();



//单例模式：将功能细分， 并且拆分成不同的属性方法，最后由init进行参数初始化和功能的执行协调