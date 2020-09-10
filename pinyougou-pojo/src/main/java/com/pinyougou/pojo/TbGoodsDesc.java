package com.pinyougou.pojo;

import java.io.Serializable;

public class TbGoodsDesc implements Serializable {
    private Long goodsId;

    //描述
    private String introduction;

    //规格列表
    private String specificationItems;

    //自定义属性集
    private String customAttributeItems;

    //图片列表
    private String itemImages;

    private String packageList;

    private String saleService;

    public Long getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Long goodsId) {
        this.goodsId = goodsId;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction == null ? null : introduction.trim();
    }

    public String getSpecificationItems() {
        return specificationItems;
    }

    public void setSpecificationItems(String specificationItems) {
        this.specificationItems = specificationItems == null ? null : specificationItems.trim();
    }

    public String getCustomAttributeItems() {
        return customAttributeItems;
    }

    public void setCustomAttributeItems(String customAttributeItems) {
        this.customAttributeItems = customAttributeItems == null ? null : customAttributeItems.trim();
    }

    public String getItemImages() {
        return itemImages;
    }

    public void setItemImages(String itemImages) {
        this.itemImages = itemImages == null ? null : itemImages.trim();
    }

    public String getPackageList() {
        return packageList;
    }

    public void setPackageList(String packageList) {
        this.packageList = packageList == null ? null : packageList.trim();
    }

    public String getSaleService() {
        return saleService;
    }

    public void setSaleService(String saleService) {
        this.saleService = saleService == null ? null : saleService.trim();
    }

    @Override
    public String toString() {
        return "TbGoodsDesc{" +
                "goodsId=" + goodsId +
                ", introduction='" + introduction + '\'' +
                ", specificationItems='" + specificationItems + '\'' +
                ", customAttributeItems='" + customAttributeItems + '\'' +
                ", itemImages='" + itemImages + '\'' +
                ", packageList='" + packageList + '\'' +
                ", saleService='" + saleService + '\'' +
                '}';
    }
}