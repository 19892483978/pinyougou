 //控制层 
app.controller('goodsController' ,function($scope,$controller,goodsService,
										   itemCatService,sellerService,brandService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;
				console.log("id == "+$scope.entity.goods.id);
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	 
	//批量删除 
	$scope.dele=function(){

		//获取选中的复选框			
		goodsService.dele($scope.selectIds).success(
			function(response){
				if(response.success){
					alert("success");
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

	$scope.status=['未审核','已审核','审核未通过','关闭'];//商品状态
	$scope.itemCatList=[];//商品分类列表
	//查询商品分类
	$scope.findItemCatList=function(){
		itemCatService.findAll().success(
			function(response){
				for(var i=0;i<response.length;i++){
					$scope.itemCatList[response[i].id]=response[i].name;
				}
			}
		);
	}
	//更改状态
	$scope.updateStatus=function(status){
		goodsService.updateStatus($scope.selectIds,status).success(
			function(response){
				if(response.success){//成功
					alert("success");
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];//清空 ID 集合
				}else{
					alert(response.message);
				}
			}
		);
	}
	$scope.entity={
		goods:{}
	};
	//获取当前商家和品牌
	$scope.$watch("entity.goods.id",function () {
		sellerService.findOne($scope.entity.goods.sellerId).success(
			function (response) {
				$scope.seller = response;
			}
		);
		brandService.findOne($scope.entity.goods.brandId).success(
			function (response) {
				$scope.brand = response;
				console.log("response == "+$scope.brand);
			}
		)
	});
	// $scope.status2=["无效","有效"];
});	
