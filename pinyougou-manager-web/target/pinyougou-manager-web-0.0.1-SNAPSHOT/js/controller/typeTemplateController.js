 //控制层
 //在模板控制层需要使用品牌服务层的方法,所以需要添加依赖注入
app.controller('typeTemplateController' ,function($scope,$controller,typeTemplateService
,brandService,specificationService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		typeTemplateService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		typeTemplateService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		typeTemplateService.findOne(id).success(
			function(response){
				//从后台获取的数据是String, angularJs存的时候自动转换为集合
				$scope.entity= response;
				//但是从这个实体类中取出brandIds和specIds是String类型需要转换为json对象
				$scope.entity.brandIds = JSON.parse($scope.entity.brandIds);
				$scope.entity.specIds = JSON.parse($scope.entity.specIds);
				$scope.entity.customAttributeItems = JSON.parse($scope.entity.customAttributeItems);
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=typeTemplateService.update( $scope.entity ); //修改  
		}else{
			serviceObject=typeTemplateService.add( $scope.entity  );//增加 
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
		typeTemplateService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		typeTemplateService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

	//test select2 多选下拉框 格式与select2的index.js中config3 数据格式一致
	// []中的数据是map格式
	// $scope.brandList={data:[]}; //品牌列表
	//读取品牌列表
	$scope.findBrandList=function(){
		brandService.selectOptionList().success(
			function(response){
				$scope.brandList={data:response};
			}
		);
	}

	$scope.specificationList={data:[]};
	$scope.findSpecificationList=function () {
		specificationService.selectOptionList().success(
			function (response) {
				$scope.specificationList={data:response};
			}
		);
	}
	$scope.findSpecificationList();

	$scope.entity = {customAttributeItems:[]};
	//新增扩展属性行
	$scope.addTableRow=function () {
		$scope.entity.customAttributeItems.push({});
	}
	//删除扩展属性行
	$scope.deleTableRow=function(index){
		$scope.entity.customAttributeItems.splice(index,1);//删除
	}

	$scope.jsonToString=function(jsonString,key){
		var json=JSON.parse(jsonString);//将 json 字符串转换为 json 对象
		var value="";
		for(var i=0;i<json.length;i++){
			if(i>0){
				value+=","
			}
			value+=json[i][key];
		}
		return value;
	}
});	