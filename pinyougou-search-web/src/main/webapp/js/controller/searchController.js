app.controller('searchController',function($scope,$location,searchService){
    //搜索
    $scope.search=function(){
        searchService.search($scope.searchMap).success(
            function(response){
                $scope.resultMap=response;//搜索返回的结果
                buildPageLabel();//调用
            }
        );
    }
    //过滤查询,根据上一步构建的查询条件,如选择某个品牌时,实现分类和规格的过滤查询
    //声明搜索条件对象
    $scope.searchMap={'keywords':'','category':'','moverPageNo':1, 'brand':'','spec':{},
        'price':'','pageNo':1,'pageSize':20,'sortField':'','sort':''};
    //添加搜索项(条件)
    $scope.addSearchItem=function(key,value){
        if(key=='category' || key=='brand' || key=='price'){    //如果点击的是分类或者是品牌
            $scope.searchMap[key]=value;
        }else{
            $scope.searchMap.spec[key]=value;
        }
        $scope.search();    //执行搜索
    }
    //撤销搜索项
    $scope.removeSearchItem=function(key){
        if(key=="category" || key=="brand" || key=='price'){//如果是分类或品牌
            $scope.searchMap[key]="";
        }else{//否则是规格
            delete $scope.searchMap.spec[key];//移除此属性
        }
        $scope.search();//执行搜索
    }
    //构建分页标签(totalPages 为总页数)
    buildPageLabel=function(){
        $scope.pageLabel=[];//新增分页栏属性
        var maxPageNo= $scope.resultMap.totalPages;//得到最后页码
        var firstPage=1;//开始页码
        var lastPage=maxPageNo;//截止页码
        //显示省略号
        $scope.firstDot=true;//前面有点
        $scope.lastDot=true;//后边有点
        //以当前页为中心显示五页,当前页小于或等于3和当前页大于等于最大页码-2时不变化
        if($scope.resultMap.totalPages > 5){ //如果总页数大于 5 页,显示部分页码
            if($scope.searchMap.pageNo<=3){//如果当前页小于等于 3
                lastPage=5; //前 5 页
                $scope.firstDot=false;//前面没点
            }else if( $scope.searchMap.pageNo>=lastPage-2 ){
                firstPage= maxPageNo-4; //   显示最后 5 页
                $scope.lastDot=false;//后边没点
            }else{ //显示当前页为中心的 5 页
                firstPage=$scope.searchMap.pageNo-2;
                lastPage=$scope.searchMap.pageNo+2;
            }
        }else{
            //小于5页
            $scope.firstDot=false;//前面无点
            $scope.lastDot=false;//后边无点
        }
        //循环产生页码标签
        for(var i=firstPage;i<=lastPage;i++){
            $scope.pageLabel.push(i);
        }
    }
    //根据页码查询
    $scope.queryByPage=function(pageNo) {
        //页码验证(点击时页码不小于第一页,和不大于最后一页)
        pageNo = parseInt(pageNo);
        if(pageNo<1 || pageNo>$scope.resultMap.totalPages){
            return;
        }
        $scope.searchMap.pageNo=pageNo;
        $scope.search();
    }
    //判断当前页为第一页
    $scope.isTopPage=function() {
        if ($scope.searchMap.pageNo == 1) {
            return true;
        }else{
            return false;
        }
    }
    //判断当前页是否未最后一页
    $scope.isEndPage=function(){
        if($scope.searchMap.pageNo==$scope.resultMap.totalPages){
            return true;
        }else{
            return false;
        }
    }
    //设置排序规则
    $scope.sortSearch=function(sortField,sort){
        $scope.searchMap.sortField=sortField;
        $scope.searchMap.sort=sort;
        $scope.search();
    }
    //判断关键字是不是品牌
    $scope.keywordsIsBrand=function(){
        for(var i=0;i<$scope.resultMap.brandList.length;i++){
            if($scope.searchMap.keywords.indexOf($scope.resultMap.brandList[i].text)>=0){//如果包含
                return true;
            }
        }
        return false;
    }
    //加载查询字符串
    $scope.loadkeywords=function(){
        $scope.searchMap.keywords = $location.search()['keywords'];
        if($scope.searchMap.keywords != undefined){
            $scope.search();
        }
    }
});