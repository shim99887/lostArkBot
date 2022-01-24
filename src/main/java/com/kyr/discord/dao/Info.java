package com.kyr.discord.dao;

import java.util.List;

public class Info {
    private String ExpeditionLV;
    private String CombatLv;
    private String ItemLv;
    private String imgLink;
    private String url;
    private List<String> Engraving;

    public List<String> getEngraving() {
        return Engraving;
    }

    public void setEngraving(List<String> engraving) {
        Engraving = engraving;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getImgLink() {
        return imgLink;
    }

    public void setImgLink(String imgLink) {
        this.imgLink = imgLink;
    }

    public String getItemLv() {
        return ItemLv;
    }

    public void setItemLv(String itemLv) {
        ItemLv = itemLv;
    }

    public String getCombatLv() {
        return CombatLv;
    }

    public void setCombatLv(String combatLv) {
        CombatLv = combatLv;
    }

    @Override
    public String toString() {
        return "Info{" +
                "ExpeditionLV='" + ExpeditionLV + '\'' +
                '}';
    }

    public String getExpeditionLV() {
        return ExpeditionLV;
    }

    public void setExpeditionLV(String expeditionLV) {
        ExpeditionLV = expeditionLV;
    }
}
