package entity;

import java.io.Serializable;

//通用类判断程序是否执行成功
public class Result implements Serializable {
    private boolean success;
    private String message;
    public Result(boolean success, String message) {
        super();
        this.success = success;
        this.message = message;
    }
    //要生成get和set方法前台页面才能取到值
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
