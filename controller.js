var controller={

serialize:function(){
	var temp="";
	if (model.register.length===0){
	temp="_"+0;
	}
	else{	
	temp=model.register[model.register.length-1]
	temp=temp.slice(1);
	temp=parseInt(temp);
	temp++;
	temp="_"+temp;
	}
	
	model.register.push(temp);
	return temp;
	},

name:function(x){
	this.id=controller.serialize();
	this.name=x;
	this.scores=[0,0];
	this.scoreSum=0;
	return this;
	},

updateSums:function(x,u){
	var target=0;
	if (u=="user1"){
		var target=1;
		}
	for (var i=0;i<x.length;i++){
		for (var j=0;j<model.names.length;j++){
			if (x[i]==model.names[j].id){
				model.names[j].scores[target]=i;
				}
			}
		}
		
	for (var i=0;i<model.names.length;i++){
		model.names[i].scoreSum=model.names[i].scores[0]+model.names[i].scores[1];
		}
		
	console.log("from Controller's Update Sums method: ");
	console.log(model);
	controller.save();
	},	
	
removeName:function(x){
	for (var i=0;i<model.names.length;i++){
		if (x==model.names[i].id){
			model.names.splice(i,1);
			break
			}
		}
	controller.save();
	},
	
addName:function(x){
	var n=new controller.name(x);
	console.log(n);
	//model.names.reverse();
	model.names.push(n);
	//model.names.reverse();
	controller.save();
	},
	
save:function(){
	store.set(model.appName,model);
	console.log("model saved!");
	console.log(store.get(model.appName));
	},
	
load: function(){
	if (!store.get(model.appName)){
		controller.save();
		console.log("new model saved!");
		console.log(store.get(model.appName));
		}
	else {
		model=store.get(model.appName);
		console.log("model retrieved!");
		console.log(model);
		}
	}
};