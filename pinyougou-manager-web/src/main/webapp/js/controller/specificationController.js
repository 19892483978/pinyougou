 //控制层 
app.controller('specificationController' ,function($scope,$controller,specificationService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		specificationService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		specificationService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

	//查询实体
	//定义entity基类
	$scope.entity = {};
	$scope.findOne=function(id){				
		specificationService.findOne(id).success(
			function(response){
				$scope.entity = response;
			}
		);				
	}

	//即要提交entity又要提交规格选项,那么就提交一个entity组合给后台
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象
		console.log($scope.entity.specificationOptionList);
		if($scope.entity.specification.id!=null){//如果有ID
			serviceObject=specificationService.update( $scope.entity ); //修改  
		}else{
			serviceObject=specificationService.add( $scope.entity  );//增加 
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
		specificationService.dele( $scope.selectIds ).success(
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
		specificationService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

	//新增行思路：
	//创建一个集合,在表格中遍历该集合.
	//当点击新增规格选项时,执行push方法,添加任意数据,使集合长度+1,这时就会新增一行
	//外部的entity是null
	//点击修改时执行findOne为entity赋值
	//外部写$scope.entity.specificationOptionList = []; 会报错,因为还没有为entity赋值
	//$scope.entity = {specificationOptionList = []};点击findOne时被覆盖
	// 点击新建时初始化entity ng-click="entity={specificationOptionList:[]}

	$scope.addTableRow=function(){
		$scope.entity.specificationOptionList.push({});
	}
	$scope.deleTableRow=function(index){
		$scope.entity.specificationOptionList.splice(index,1);//删除
	}
});	
