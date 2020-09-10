package com.pinyougou.sellergoods.service;

import com.pinyougou.pojo.TbBrand;
import entity.PageResult;

import java.util.List;
import java.util.Map;

//品牌接口
public interface BrandService {
    List<TbBrand> findAll();
    PageResult findPage(int pageNum,int pageSize);
    PageResult findPage(TbBrand brand,int pageNum,int pageSize);
    void add(TbBrand brand);
    void update(TbBrand brand);
    //根据id查询实体
    TbBrand findOne(Long id);
    void delete(Long[] ids);
    List<Map> selectOptionList();
}
