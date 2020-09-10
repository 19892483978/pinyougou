var app=angular.module('pinyougou',[]); //模块层,品优购不分页模块
/*
angularJS 为了防止 html 攻击导致不能显示结果,需使用到$sce 服务的 trustAsHtml 方法
来实现转换
$sce 服务写成过滤器
*/
app.filter('trustHtml',['$sce',function($sce){
    return function(data){
        return $sce.trustAsHtml(data);
    }
}]);