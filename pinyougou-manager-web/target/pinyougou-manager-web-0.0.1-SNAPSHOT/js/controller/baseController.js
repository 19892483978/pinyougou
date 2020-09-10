//分页功能
//有些功能是每个页面都由可能用到,比如分页,复选等,可以通过继承的方式来让这些通用功能只写一次
app.controller('baseController',function ($scope){
    //分页控件配置
    $scope.paginationConf = {
        currentPage:1,			//从第1页开始
        totalItems:10,			//每页条数
        itemsPerPage:10,		//初始页面总共多少条数据
        perPageOptions:[10,20,30,40,50],
        onChange:function () {
            $scope.reloadList();	//调用函数初始化列表 数据
        }
    }

    //重新加载列表 数据
    $scope.reloadList=function(){
        //切换页码
        $scope.search($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    }

    $scope.selectIds=[];//选中的 ID 集合
    //更新复选框 $event 将元素封装成对象,$event.target获取当前元素
    $scope.updateSelection = function($event, id) {
        if($event.target.checked){//如果是被选中,则增加到数组
            $scope.selectIds.push(id);
        }else{
            var idx = $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(idx, 1);//取消勾选参数1为下标，参数2位移除的个数
        }
    }
});