//服务层
app.service('contentService',function($http){
	//index在根目录不需要加../
	//根据分类 ID 查询广告列表
	this.findByCategoryId=function(categoryId){
		return $http.get("content/findByCategoryId.do?categoryId="+categoryId);
	}
});
