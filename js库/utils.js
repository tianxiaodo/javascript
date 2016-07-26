/**
 * Created by winter on 2015/1/12.
 */
var utils={
    max:function(arr){
        arr.sort(function(a,b){return parseInt(a)-parseInt(b);});
        return arr[arr.length-1];
    },
    min:function(arr){
        arr.sort(function(a,b){return parseInt(a)-parseInt(b);});
        return arr[0];
    },
    avg:function(arr)
    {
      var str=Array.prototype.join.call(arr,'+');

      return eval(str);
    },
    nodelistToArray:function(nodeList){
        var ary = [];
        try {
            ary = Array.prototype.slice.call(nodeList, 0);
        } catch (e) {
            for (var i = 0; i < nodeList.length; i++) {
                ary.push(nodeList[i]);
            }
            //throw new Error("");
        }
        return ary;
    },
    sort:function(arr){
         debugger;
        var na=[];
        for(var i=0;i<arr.length;i++)
        {
            var ss=arr[i];
            na.push(ss.charCodeAt());
        }
        na.sort(function(a,b){return a-b});
        for(var j=0;j<na.length;j++)
        {
            arr[j]=String.fromCharCode(na[j]);
        }
        return arr;
    }
};