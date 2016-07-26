(function(win){
    win.$={};
    $.util={
        getXHR:function(){

            for(var i= 0,arr=[
                function(){
                    return new XMLHttpRequest();
                },
                function(){
                    return new ActiveXObject("Microsoft.XMLHTTP");
                },
                function(){
                    return new ActiveXObject("MsXML3.0.XMLHTTP");
                },
                function(){
                    return new ActiveXObject("MsXML2.0.XMLHTTP");
                }
            ],xhr=null;i<arr.length;i++)
            {
                try{
                    xhr=arr[i]();
                    this.getXHR=arr[i]();
                    break;
                }
                catch (ex)
                {

                }
            }
            if(xhr===null)
            {
                throw  new ReferenceError("not support");  // 引用错误
            }
            else
            {
                return xhr;
            }
        },
        resolved:function(data){
            var arr=[];
            if(typeof data=="string")
            {
                return data;
            }
            for(var i in data)
            {
                arr.push(encodeURIComponent(i)+"="+encodeURIComponent(data[i]));
            }
            return arr.join("&");

        },
        noCache:function(url){
           if(url.indexOf("?"))
           {
            url+="&"+ (new Date).now();
           }
            else
           {
            url+="?"+(new Date).now();
           }
            return url;
        }
    };

    $.ajax=function(argu){
        var _default={
            method:"",
            type:"text",
            url:"",
            data:"",
            isAsync:true,
            headers:{},
            cache:false,
            onSuccess:null,
            onError:null,
            timeout:0,
            onTimeout:null,
            username:undefined,
            password:undefined

        };
        for(var n in argu)
        {
            if(!argu.hasOwnProperty(n)){
                continue;
            }
            if(n=="data")
            {
                _default[n]=this.util.resolved(argu[n]);
            }
            else
            {
            _default[n]=argu[n];
            }
        }
        var xhr=this.util.getXHR();

        xhr.responseType=_default.type;

        if(new RegExp(_default.method).test(["get","put","delete"]) && _default.data)
        {
            _default.url+="?"+_default.data;
            if(!_default.cache)
            {
                _default.url+="&"+Math.random();
            }
            _default.data=undefined;
        }
        else{
            if(!_default.cache)
                _default.url+="?"+Math.random();
        }


        xhr.open(_default.method,_default.url,_default.isAsync,_default.username,_default.password);

        for(var i in _default.headers)
        {
            xhr.setRequestHeader(i,_default.headers[i]);
        }

        xhr.onreadystatechange=function(){
          if(this.readyState==4&&/^2\d{2}$/.test(this.status))
          {
              _default.onSuccess(this.response,this.getAllResponseHeaders());
              _time&&clearTimeout(_time);
          }

        };

        xhr.onerror=_default.onError;
        xhr.send(_default.data);
        if(_default.timeout)
        {
            if("ontimeout" in xhr)
            {
                xhr.timeout=_default.timeout;
                xhr.ontimeout=_default.onTimeout;
            }
            else {
               var _time= setTimeout(function(){
                    xhr.abort();
                    _default.onTimeout();
                },_default.timeout);
            }
        }
    };

})(window);