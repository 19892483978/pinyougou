package com.pinyougou.solrutil;

import com.alibaba.fastjson.JSON;
import com.pinyougou.mapper.TbItemMapper;
import com.pinyougou.pojo.TbItem;
import com.pinyougou.pojo.TbItemExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.core.query.Query;
import org.springframework.data.solr.core.query.SimpleQuery;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class SolrUtil {
    @Autowired
    private TbItemMapper itemMapper;
    @Autowired
    private SolrTemplate solrTemplate;
    /**
     * 导入商品数据
     */
    //在solr中当id相同时会覆盖数据
    //若要更新solr中的数据首先要更新redis中的数据,在覆盖solr中的数据
    public void importItemData(){
        TbItemExample example=new TbItemExample();
        TbItemExample.Criteria criteria = example.createCriteria();
        criteria.andStatusEqualTo("1");//已上架(已审核才能上架)
        List<TbItem> itemList = itemMapper.selectByExample(example);
        System.out.println("===商品列表===");
        for(TbItem item:itemList){
            System.out.println(item.getId()+"  "+item.getTitle());
            System.out.println(item.getSpec());
            // 格式转换  [...]是集合类型使用parseArray方法,
            // {"电视屏幕尺寸":"55英寸"}是对象格式 使用parseObject方法
            Map map = JSON.parseObject(item.getSpec(), Map.class);
            item.setSpecMap(map);
            System.out.println(item);
        }
        solrTemplate.saveBeans(itemList); //存储到sole服务器中
        solrTemplate.commit();
        System.out.println("===结束===");
    }
    public void deleteDate(){
        Query query=new SimpleQuery("*:*");
        solrTemplate.delete(query);
        solrTemplate.commit();
    }
    public static void main(String[] args) {
        // 不能直接加载importItemData方法需要先加载spring
        // 需要加载dao的配置文件,classpath* 搜索jar包中的配置文件
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath*:spring/applicationContext*.xml");
        SolrUtil solrUtil= (SolrUtil) context.getBean("solrUtil");  //获取当前bean类
        solrUtil.importItemData();
    }
}
