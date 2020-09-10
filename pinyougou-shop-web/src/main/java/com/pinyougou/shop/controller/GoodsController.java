package com.pinyougou.shop.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbGoods;
import com.pinyougou.pojogroup.Goods;
import com.pinyougou.sellergoods.service.GoodsService;
import entity.PageResult;
import entity.Result;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * controller
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/goods")
public class GoodsController {

	@Reference
	private GoodsService goodsService;
	
	/**
	 * 返回全部列表
	 * @return
	 */
	@RequestMapping("/findAll")
	public List<TbGoods> findAll(){
		System.out.println("执行了findAll方法");
		return goodsService.findAll();
	}
	
	
	/**
	 * 返回全部列表
	 * @return
	 */
	@RequestMapping("/findPage")
	public PageResult  findPage(int page,int rows){
		System.out.println("执行了findPage方法");
		return goodsService.findPage(page, rows);
	}
	
	/**
	 * 增加
	 * @param goods
	 * @return
	 */
	@RequestMapping("/add")
	public Result add(@RequestBody Goods goods){
		String sellerId = SecurityContextHolder.getContext().getAuthentication().getName();
		goods.getGoods().setSellerId(sellerId);//设置商家 ID
		try {
			goodsService.add(goods);
			return new Result(true, "增加成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "增加失败");
		}
	}
	
	/**
	 * 修改
	 * @param goods
	 * @return
	 */
	@RequestMapping("/update")
	public Result update(@RequestBody Goods goods){
		try {
			Goods goods2 = goodsService.findOne(goods.getGoods().getId());
			goodsService.update(goods);
			//获取当前登录的商家 ID
			String sellerId = SecurityContextHolder.getContext().getAuthentication().getName();
			//如果传递过来的商家 ID 并不是当前登录的用户的 ID,则属于非法操作
			if(!goods2.getGoods().getSellerId().equals(sellerId) || !goods.getGoods().getSellerId().equals(sellerId)){
				return new Result(false, "操作非法");
			}
			return new Result(true, "修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "修改失败");
		}
	}
	/**
	 * 获取实体
	 * @param id
	 * @return
	 */
	//修改findOne返回的类型为组合实体类
	@RequestMapping("/findOne")
	public Goods findOne(Long id){
		System.out.println(goodsService.findOne(id));
		return goodsService.findOne(id);
	}
	
	/**
	 * 批量删除
	 * @param ids
	 * @return
	 */
	@RequestMapping("/delete")
	public Result delete(Long [] ids){
		try {
			goodsService.delete(ids);
			return new Result(true, "删除成功"); 
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "删除失败");
		}
	}
	
		/**
	 * 查询+分页
	 * @param goods
	 * @param page
	 * @param rows
	 * @return
	 */
	//
	@RequestMapping("/search")
	public PageResult search(@RequestBody TbGoods goods, int page, int rows  ){
		System.out.println("执行了分页方法..");
		//获取商家 ID ,并设置商家id
		String sellerId =
				SecurityContextHolder.getContext().getAuthentication().getName();
		//添加查询条件,取消模糊查询
		goods.setSellerId(sellerId);
		return goodsService.findPage(goods, page, rows);		
	}

	@RequestMapping("/updateSaleStatus")
	public Result updateSaleStatus(Long[] ids, String saleStatus){
		try {
			goodsService.updateSaleStatus(ids, saleStatus);
			return new Result(true, "成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "失败");
		}
	}
}
