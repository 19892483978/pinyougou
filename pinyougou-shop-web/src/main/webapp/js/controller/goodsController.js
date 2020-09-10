 //控制层
 //调用服务层时,该服务层对应的controller不能缺失
 //引入location服务,获取请求id
app.controller('goodsController' ,function($scope,$controller,$location,goodsService,
										   uploadService,itemCatService,typeTemplateService){
	
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
				alert("执行了findPage");
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体
	$scope.findOne=function(){
		//修改findOne方法
		var id= $location.search()['id'];//获取参数值
		if(id==null){
			return ;
		}
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;
				//向富文本编辑器添加商品介绍
				editor.html($scope.entity.goodsDesc.introduction);
				//显示图片列表
				$scope.entity.goodsDesc.itemImages= parseJSON($scope.entity.goodsDesc.itemImages);
				//显示扩展属性
				$scope.entity.goodsDesc.customAttributeItems =
					parseJSON($scope.entity.goodsDesc.customAttributeItems);
				//规格
				$scope.entity.goodsDesc.specificationItems=
					parseJSON($scope.entity.goodsDesc.specificationItems);
				//SKU 列表规格列转换
				for( var i = 0; i < $scope.entity.itemList.length; i++ ){
					$scope.entity.itemList[i].spec = parseJSON( $scope.entity.itemList[i].spec);
				}
			}
		);				
	}
	//根据规格名称和选项名称返回是否被勾选
	$scope.checkAttributeValue=function(specName,optionName){
		var items= $scope.entity.goodsDesc.specificationItems;
		var object= $scope.searchObjectByKey(items,'attributeName',specName);
		if(object==null){
			return false;
		}else{
			if(object.attributeValue.indexOf(optionName)>=0){
				return true; }else{
				return false; }
		}
	}
	//json格式的字符串统一通过此方法转换为json数据
	function parseJSON(str){
		return JSON.parse(str);
	}

	//保存 
	$scope.save=function(){

		var serviceObject;//服务层对象
		if($scope.entity.goods.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加
		}
		serviceObject.success(
			function(response){
				if(response.success){
					alert('保存成功');
					location.href="goods.html";//跳转到商品列表页
				}else{
					alert(response.message);
				}
			}
		);
	}

	$scope.add=function(){
		$scope.entity.goodsDesc.introduction = editor.html();
		goodsService.add($scope.entity).success(
			function (response) {
				if(response.success){
					alert("保存成功");
					$scope.entity={}; //保存成功后清空实体类
					editor.html('');  //富文本编辑器是独立的,需要独立清空
				}else{
					alert(response.message);
				}
			}
		)
	}

	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}

	//批量提交审核


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
	//html中img标签的加载在js之前,其他DOM元素在js之后,img标签取值错误可以不用理会
	$scope.image_entity = {
		url:"",
		color:""
	};
	//上传图片,提交的是图片的二进制数据
	$scope.uploadFile=function(){
		uploadService.uploadFile().success(function(response) {
			if(response.success){//如果上传成功，取出 url
				$scope.image_entity.url=response.message;//设置文件地址
			}else{
				alert(response.message);
			}
		}).error(function() {
			alert("上传发生错误");
		});
	};

	// $scope.entity={goods:{},goodsDesc:{itemImages:[]}};//定义页面实体结构(组合实体类)
	//添加图片列表
	$scope.add_image_entity=function(){
		$scope.entity.goodsDesc.itemImages.push($scope.image_entity);
	}

	//列表中移除图片
	$scope.remove_image_entity=function(index){
		$scope.entity.goodsDesc.itemImages.splice(index,1);
	}

	//读取一级分类
	$scope.selectItemCat1List=function(){
		itemCatService.findByParentId(0).success(
			function(response){
				$scope.itemCat1List=response;
			}
		);
	}
	//读取二级分类
	//$watch 方法用于监控某个变量的值，当被监控的值(参数1)发生变化，就自动执行相应的函数。
	$scope.$watch('entity.goods.category1Id', function(newValue, oldValue) {

		//根据选择的值，查询二级分类
		itemCatService.findByParentId(newValue).success(
			function(response){
				$scope.itemCat2List=response;
			}
		);
	});
	//读取三级分类
	$scope.$watch('entity.goods.category2Id', function(newValue, oldValue) {
		//根据选择的值，查询二级分类
		itemCatService.findByParentId(newValue).success(
			function(response){
				$scope.itemCat3List=response;
			}
		);
	});
	//三级分类选择后 读取模板 ID
	$scope.$watch('entity.goods.category3Id', function(newValue, oldValue) {
		itemCatService.findOne(newValue).success(
			function(response){
				$scope.entity.goods.typeTemplateId=response.typeId; //更新模板 ID
			}
		);
	});

	//模板 ID 选择后,查询该模板对应的品牌(当品牌数据很多的时,若显示全部很难找)
	$scope.$watch('entity.goods.typeTemplateId', function(newValue, oldValue) {
		typeTemplateService.findOne(newValue).success(
			function(response){
				$scope.typeTemplate=response;				//获取类型模板
				$scope.typeTemplate.brandIds = JSON.parse( $scope.typeTemplate.brandIds);//品牌列表
				//读取模板id后扩展属性被重置了所以需要判断一下,如果没有 ID，则加载模板中的扩展数据
				if($location.search()['id']==null){
					$scope.entity.goodsDesc.customAttributeItems =
					JSON.parse($scope.typeTemplate.customAttributeItems);	//扩展属性
				}
			}
		);
		//查询规格列表
		//平时返回的List集合中存放的是实体类,这次存放的是一个个map集合
		typeTemplateService.findSpecList(newValue).success(
			function(response){
				$scope.specList=response;
			}
		);
	});

	$scope.entity = {goodsDesc:{itemImages:[],specificationItems:[]}};
	//选择复选框时调用该方法,插入数据
	$scope.updateSpecAttribute = function ($event,name,value) {
		//searchObjectByKey方法判断规格名是否存在,存在时返回当前list对象
		var object= $scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems ,
			'attributeName', name);

		if(object!=null){
			//规格名存在判断是否选中,选择时添加数据,取消时移除
			if($event.target.checked ){
				object.attributeValue.push(value);
			}else{//取消勾选项
				object.attributeValue.splice( object.attributeValue.indexOf(value ) ,1);//移除选
				//如果选项都取消了，将此条记录移除
				if(object.attributeValue.length===0){
					$scope.entity.goodsDesc.specificationItems.splice(
						$scope.entity.goodsDesc.specificationItems.indexOf(object),1);
				}
			}
		}else{
			//规格名不存在,添加规格名称
			$scope.entity.goodsDesc.specificationItems.push(
				{"attributeName":name,"attributeValue":[value]});
		}
	}

	//创建SKU列表
	$scope.createItemList=function () {
		//初始化itemList集合
		$scope.entity.itemList=[{spec:{},price:0,num:99999,status:'0',isDefault:'0'}];
		//$scope.entity.goodsDesc.specificationItems需要用到很多次,使用一个变量接收规格数据
		//值:[{"attributeValue":["移动3G","移动4G"],"attributeName":"网络"},{"attributeValue":["16G","32G"],"attributeName":"机身内存"}]
		var items = $scope.entity.goodsDesc.specificationItems;
		for(var i=0;i < items.length;i++){	//遍历规格数据
			//参数1 List对象  参数2 获取attributeName对应的值, 参数3 获取attributeValue对应的数组
			$scope.entity.itemList = addColumn($scope.entity.itemList,
				items[i].attributeName,items[i].attributeValue);
		}
		//添加列值,不加$scope就是私有方法
		//使用课件中的这种写法addColumn=function() 无法执行函数
		 function addColumn(list,columnName,columnValues){
			var newList=[];//新的集合
			for(var i=0;i<list.length;i++){
				// oldRow = list[0] 对应 oldRow = {"attributeValue":["移动3G","移动4G"],"attributeName":"网络"}
				var oldRow= list[i];
				for(var j=0;j<columnValues.length;j++){
					//克隆 oldRow
					var newRow = JSON.parse( JSON.stringify( oldRow ) );//深克隆
					newRow.spec[columnName] = columnValues[j];
					newList.push(newRow);
				}
			}
			return newList;
		}
	}

	$scope.status=['未审核','已审核','审核未通过','关闭'];	//商品状态
	$scope.status2=['未上架','已上架'];						//上架状态

	$scope.itemCatList=[];									//商品分类列表
	//加载商品分类列表
	$scope.findItemCatList=function () {
		//获取品牌分类全都数据
		itemCatService.findAll().success(
			function (response) {
				//为数组赋值 itemCatList[1] = 图书,影像...  itemCatList[1]=...
				for(var i=0;i<response.length;i++){
					$scope.itemCatList[response[i].id]=response[i].name;
				}
			}
		);
	};
	//option in pojo.options每遍历一次都会执行该方法 传递的数据格式为 网络,移动3G 网络,移动4G ....
	$scope.checkAttributeValue = function (specName,optionName) {
		var items= $scope.entity.goodsDesc.specificationItems;
		//查询规格名是否存在
		var object= $scope.searchObjectByKey(items,'attributeName',specName);
		if(object == null){
			return false;
		}else{
			if(object.attributeValue.indexOf(optionName)>=0){
				return true;
			}else {
				return false;
			}
		}
	}
	//商品上下架	selectIds在父类控制器baseController中
	$scope.updateSaleStatus=function(saleStatus){

		goodsService.updateSaleStatus($scope.selectIds,saleStatus).success(
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
});	
