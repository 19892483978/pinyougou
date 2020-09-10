package com.pinyougou.search.service.impl;

import com.alibaba.fastjson.JSON;
import com.pinyougou.pojo.TbItem;
import com.pinyougou.search.service.ItemSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.jms.*;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Component
public class ItemDeleteListener implements MessageListener {
    @Autowired
    private ItemSearchService itemSearchService;
    @Override
    public void onMessage(Message message) {
        ObjectMessage objectMessage = (ObjectMessage)message;
        try {
            Long[] goodsIds = (Long[]) objectMessage.getObject();
            System.out.println("监听获取的信息"+goodsIds);
            itemSearchService.deleteByGoodsIds(Arrays.asList(goodsIds));
            System.out.println("执行索引库删除...");
        } catch (JMSException e) {
            e.printStackTrace();
        }

    }
}
