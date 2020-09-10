app.controller('brandController',function ($scope,$controller,brandService){
    //$controller也是一个模块,必须注入才能使用
    //继承baseController类,语句$scope:$scope的意思是继承baseController的scope
    $controller('baseController',{$scope:$scope});

    //条件查询
    $scope.searchEntity={}; //定义搜索对象,在搜索文本框为其添加属性并赋值
    $scope.search=function(page,rows){
        //传输对象类型只能是post,需要传给后台的数据是页数,条数,及当前对象
        brandService.search(page,rows,$scope.searchEntity).success(
            function(response){
                $scope.paginationConf.totalItems=response.total;//总记录数
                $scope.list=response.rows;//给列表变量赋值
            }
        )
    }

    //页面的新增和修改都使用了同一文本框
    //当需要修改时查询要修改的实体
    $scope.findOne=function(id){
        brandService.findOne(id).success(
            function (response) {
                //scope已经绑定了entity属性,那么就将返回的json数据赋值给entity就行了
                $scope.entity=response;
            }
        );
    }

    // save 表示新增 or 修改
    $scope.save=function () {
        var methodName = "add";
        if($scope.entity.id != null){
            methodName = "update";
        }
        brandService.save(methodName,$scope.entity).success(
            function (response) {
                if (response.success === true){
                    $scope.reloadList();//重新加载(刷新页面)
                }else{
                    alert(response.message);
                }
            }
        )
    }

    //delete是关键字不能作为方法名
    $scope.dele=function(){
        //获取选中的复选框
        if(confirm("确定要删除吗？")){
            brandService.delete($scope.selectIds).success(
                function(response){
                    if(response.success){
                        $scope.reloadList();//刷新列表
                    }
                }
            );
        }
    }
});