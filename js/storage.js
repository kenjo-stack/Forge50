const Storage={

KEY:"forge50-progress",

load(){

return JSON.parse(

localStorage.getItem(this.KEY)

)||{};

},

save(data){

localStorage.setItem(

this.KEY,

JSON.stringify(data)

);

},

set(id,value){

const data=this.load();

data[id]=value;

this.save(data);

},

get(id){

const data=this.load();

return data[id]||false;

},

clear(){

localStorage.removeItem(this.KEY);

}

};

window.Storage=Storage;