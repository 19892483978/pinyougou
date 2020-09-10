package com.pinyougou.search.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.search.service.ItemSearchService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/itemsearch")
public class ItemSearchController {
    @Reference
    private ItemSearchService itemSearchService;
    @RequestMapping("/search")
    public Map<String, Object> search(@RequestBody Map searchMap){
        return itemSearchService.search(searchMap);
    }
    @RequestMapping("/test")
    public String test(@RequestBody Map searchMap){
        System.out.println("执行了test方法");
        System.out.println(searchMap);
        return "123";
    }
}
