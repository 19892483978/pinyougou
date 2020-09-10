package com.pinyougou.mapper;

import com.pinyougou.pojo.TbTypeTemplate;
import com.pinyougou.pojo.TbTypeTemplateExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface TbTypeTemplateMapper {
    long countByExample(TbTypeTemplateExample example);

    int deleteByExample(TbTypeTemplateExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TbTypeTemplate record);

    int insertSelective(TbTypeTemplate record);

    List<TbTypeTemplate> selectByExample(TbTypeTemplateExample example);

    TbTypeTemplate selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TbTypeTemplate record, @Param("example") TbTypeTemplateExample example);

    int updateByExample(@Param("record") TbTypeTemplate record, @Param("example") TbTypeTemplateExample example);

    int updateByPrimaryKeySelective(TbTypeTemplate record);

    int updateByPrimaryKey(TbTypeTemplate record);

    //resultType 返回的结果集是List, =java.util.Map 表示集合中的数据类型是Map
    //select2 需要的是 List<Map> 的数据格式 -- [{"id":1,"test":"联想"},{"id":2,"test":"三星"}]
    List<Map> selectOptionList();
}