//服务层
app.service('userService',function($http){

	//增加 
	this.add=function(entity,smscode){
		return $http.post('../user/add.do?smscode='+smscode ,entity);
	}
	//修改 
	this.update=function(entity){
		return  $http.post('../user/update.do',entity );
	}
	//删除
	this.dele=function(ids){
		return $http.get('../user/delete.do?ids='+ids);
	}
	this.sendCode=function (phone) {
		return $http.post("../user/sendCode.do?phone="+phone);
	}
});
