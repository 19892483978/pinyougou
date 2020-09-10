//分层开发,优点:避免重复代码,易于维护,可读性高
//自定义品牌服务层用于与后台交互,第一个参数是服务名,调用内置服务$http
app.service('brandService',function ($http) {   //品优购服务层
    //示例
    this.search = function (page,rows,searchEntity) {
        return $http.post("../brand/search.do?page="+page+"&rows="+rows,searchEntity);
    }
    this.findOne = function (id) {
        return $http.get("../brand/findOne.do?id="+id);
    }
    this.delete = function (ids) {
        return $http.get('../brand/delete.do?ids='+ids);
    }
    this.save = function (methodName,entity) {
        return $http.post("../brand/"+methodName+".do",entity);
    }
    this.selectOptionList = function () {
        return $http.get('../brand/selectOptionList.do');
    }
});