package com.kyr.discord.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kyr.discord.dao.Info;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.spring.web.json.Json;

import javax.xml.ws.Response;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class MainController{

    String url = "https://lostark.game.onstove.com/Profile/Character/";
//    String url = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13";

    @GetMapping("/api/{id}")
    public Info get(@PathVariable String id) throws Exception{
        Document doc = Jsoup.connect(url + URLDecoder.decode(id, "UTF-8")).userAgent("Mozilla").get();
        Elements element = doc.select("div.profile-ingame");
        if(element.select("div.profile-attention").size() > 0){
            return null;
        }
        element = doc.select("div.profile-ingame");
        Info info = new Info();
        info.setExpeditionLV(element.select("div.level-info__expedition").select("span").get(1).text());
        info.setCombatLv(element.select("div.level-info__item").select("span").get(1).text());
        info.setItemLv(element.select("div.level-info2__expedition").select("span").get(1).text());
        info.setImgLink(element.select("div.profile-equipment__character").get(0).select("img").attr("src"));
        info.setUrl(url + id);

        List<String> Engraving = new ArrayList<>();

        for(Element el : element.select("ul.swiper-slide li")){
            Engraving.add(el.select("span").get(0).text());
        }

        info.setEngraving(Engraving);
        //swiper-slide

        Json json = new Json(doc.getElementsByTag("script").get(2).html());
        return info;
    }

    @GetMapping("/api2/{id}")
    public String get2(@PathVariable String id) throws Exception{
        System.out.println(URLDecoder.decode(id, "UTF-8"));
        Document doc = Jsoup.connect(url + URLDecoder.decode(id, "UTF-8")).userAgent("Mozilla").get();
        Elements element = doc.select("div.profile-ingame");
        if(element.select("div.profile-attention").size() > 0){
            return null;
        }
//        profile-character
//        System.out.println(doc.getElementsByTag("script").get(2).html());

        ObjectMapper mapper = new ObjectMapper();
        String obj = doc.getElementsByTag("script").get(2).html();
        return obj;
    }
}
