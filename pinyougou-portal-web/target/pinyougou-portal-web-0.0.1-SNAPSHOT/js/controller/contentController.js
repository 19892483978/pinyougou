 //控制层 
app.controller('contentController' ,function($scope,$controller,contentService){
	
	$controller('baseController',{$scope:$scope});//继承

	$scope.contentList=[];//将所有广告存放到一个集合中,通过categoryId来取值
	//findByCategoryId(1) 查询分类id为1的广告
	$scope.findByCategoryId=function(categoryId){
		contentService.findByCategoryId(categoryId).success(
			function(response){
				$scope.contentList[categoryId]=response;
				console.log($scope.contentList[categoryId]);
			}
		);
	}
	//搜索跳转
	$scope.search=function(){
		location.href="http://localhost:9104/search.html#?keywords="+$scope.keywords;
	}
});	
