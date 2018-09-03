//封装localstorage本地存储  模块化

var storage ={
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },get(key){
        return JSON.parse(localStorage.getItem(key));
    },
    del(key){
        localStorage.del(key);
    }
}

export default storage;