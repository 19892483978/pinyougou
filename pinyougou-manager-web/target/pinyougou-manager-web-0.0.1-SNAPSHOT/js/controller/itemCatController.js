//控制层
app.controller('itemCatController' ,function($scope,$controller,itemCatService,typeTemplateService){

	$controller('baseController',{$scope:$scope});//继承

	//读取列表数据绑定到表单中
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}
		);
	}

	//分页
	$scope.findPage=function(page,rows){
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}
		);
	}

	//查询实体
	$scope.findOne=function(id){
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;
			}
		);
	}

	//保存
	$scope.save=function(){
		var serviceObject;//服务层对象
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改
		}else{
			$scope.entity.parentId=$scope.parentId;//设置上级Id的值
			serviceObject=itemCatService.add( $scope.entity  );//增加
		}
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询
					$scope.findByParentId($scope.parentId);//重新加载到当前目录
				}else{
					alert(response.message);
				}
			}
		);
	}


	$scope.searchEntity={};//定义搜索对象

	//搜索
	$scope.search=function(page,rows){
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}
		);
	}

	$scope.parentId=0;//定义上级 ID

	//查询子分类
	$scope.findByParentId=function (parentId) {
		itemCatService.findByParentId(parentId).success(
			function (response) {
				$scope.parentId = parentId;//记住上级ID
				$scope.list=response;
			}
		)
	}
	//批量删除
	$scope.dele=function(){
		//获取选中的复选框
		itemCatService.dele( $scope.selectIds).success(
			function(response){
				if(response.success){
					$scope.selectIds=[];
					$scope.grade= $scope.parentId;
					$scope.findByParentId($scope.parentId);//重新加载到当前目录
				}
			}
		);
	}

	$scope.grade=1;//默认为 1 级
	//设置级别
	$scope.setGrade=function(value){
		$scope.grade=value;
	}
	$scope.selectList=function(p_entity){
		if($scope.grade==1){//如果为 1 级
			$scope.entity_1=null;
			$scope.entity_2=null;
		}
		if($scope.grade==2){//如果为 2 级
			$scope.entity_1=p_entity;	//保存上级实体类到entity_1中
			$scope.entity_2=null;
		}
		if($scope.grade==3){//如果为 3 级
			$scope.entity=p_entity;
			$scope.entity_2=p_entity;
		}
		//修改onclick = findByParentId(entity.id) 为 setGrande(grade+1);selectList(entity)
		//增加grade的值并调用selectList方法
		$scope.findByParentId(p_entity.id); //设置list的值
	}

	//模板下拉菜单
	$scope.templateList = {data:[]};
	$scope.findSpecificationList=function () {
		typeTemplateService.selectOptionList().success(
			function (response) {
				console.log(response);
				$scope.templateList={data:response};
			}
		);
	}
});	
