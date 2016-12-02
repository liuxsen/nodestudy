/**
 * Created by Administrator on 2016/12/1.
 */
for(var i=0;i<10;i++){
    (function(i){
        setTimeout(function(){
            console.log(i);
        },3000);
    })(i)
}

//
//for(var i=0;i<10;i++){
//        setTimeout(function(){
//            console.log(i);
//        },3000);
//}


var obj = { fields: { username: 'Groucho', accountnum: '123456' },
    files:
    { userfile:{
        domain: null,
            _events: {},
        _eventsCount: 0,
            _maxListeners: undefined,
            size: 434541,
            path: 'f:\\node\\avatar\\upload_66b92405c0ae45f89cd5abb247f43db9',
            name: '89f4051f95cad1c87ccacc6b7e3e6709c83d5147.jpg',
            type: 'image/jpeg',
            hash: null,
            lastModifiedDate: 'Thu Dec 01 2016 16:45:40 GMT+0800 (中国标准时间)',
            _writeStream: [Object] },
        webmasterfile:
             {
        domain: null,
            _events: {},
        _eventsCount: 0,
            _maxListeners: undefined,
            size: 32,
            path: 'f:\\node\\avatar\\upload_e9793ba9c3c9600f3d4a24c0ca6c11f9',
            name: 'blob',
            type: 'text/xml',
            hash: null,
            lastModifiedDate: 'Thu Dec 01 2016 16:45:40 GMT+0800 (中国标准时间)',
            _writeStream: [Object] } } };

//遍历对象

for(item in obj.files){
    (function(item){
        setTimeout(function(){
            console.log('item.name', obj.files[item].name);
        },3000)
    })(item)
}
