package com.pinyougou.search.service.impl;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SpringTask {
    @Scheduled(cron = "0/30 * *  * * ? ")
    public void downloadData(){
        System.out.println("当前服务已启用了定时任务,每30秒更新一次销量数据.....");
    }
}