//文件上传服务层
app.service("uploadService",function($http){
    this.uploadFile=function(){
        var formData=new FormData();                    //用于文件上传表单数据类
        //将要上传的内容添加到FormData中
        //第一个参数为文件上传框的name, 文件上传框的name都要叫file,我们只有一个文件上传框那么就取第一个
        formData.append("file",file.files[0]);
        //上传文件时必须使用这种写法
        return $http({
            method:'POST',
            url:"../upload.do",
            data: formData,
            // anjularjs 对于 post 和 get 请求默认的 Content-Type header 是 application/json。通过设置
            // ‘Content-Type’: undefined，这样浏览器会帮我们把 Content-Type 设置为 multipart/form-data.
            headers: {'Content-Type':undefined},
            transformRequest: angular.identity  //对表单进行二进制序列化,和FormData搭配使用
        });
    }
});