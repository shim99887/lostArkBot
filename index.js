const Discord = require("discord.js");
const config = require("./config.json");
const prefix = "!";
const {Client, Intents} = require("discord.js");
const {MessageEmbed} = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const $ = require("jquery");

const log = console.log;
const axios = require("axios");
const cheerio = require("cheerio");
const channel = client.channels.cache.get("channel id");

// axios.get('https://www.loawa.com/' + encodeURIComponent('건슬유스'))

client.on("message", function (message) {
    // message 작성자가 봇이면 그냥 return
    if (message.author.bot) return;
    // message 시작이 prefix가 아니면 return
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    const getUsers = async (id) => {
        log(encodeURIComponent(id));
        let basicInfo = new MessageEmbed();
        let detailInfo = new MessageEmbed();
        await axios
            .get("http://localhost:8080/api/" + encodeURIComponent(id))
            .then((response) => {
                if (!response.data) {
                    message.reply('사용자 정보가 없습니다.');
                    return;
                } else {
                    console.log(response.data)
                    let fields = [{
                        "name": `원정대`,
                        "value": response.data.expeditionLV,
                        "inline": true
                    },
                        {
                            "name": `전투`,
                            "value": response.data.combatLv,
                            "inline": true
                        },
                        {
                            "name": `아이템 레벨`,
                            "value": response.data.itemLv,
                            "inline": true
                        }];

                    let engraving = '';
                    for (dt in response.data.engraving) {
                        engraving += response.data.engraving[dt] + '\n';
                    }
                    fields.push({
                        "name": '각인',
                        "value": engraving,
                        "inline": true
                    })
                    console.log(fields)
                    basicInfo.setColor("#0099ff")
                        .setTitle(id)
                        .setURL(response.data.url)
                        .setDescription("Some description here")
                        .setThumbnail(response.data.imgLink)
                        .addFields(fields)
                        .setTimestamp();
                }
            });
        //#region api2
        await axios
            .get("http://localhost:8080/api2/" + encodeURIComponent(id))
            .then((response) => {
                if (!response.data) {
                    return;
                } else {
                    let data = JSON.parse(String(response.data).substring(12, String(response.data).length - 1));

                    console.log(data.CardSet);

                    const channel = client.channels.cache.find(channel => channel.id === '931016851385897023')
// channel.send(message)

                    let cardArray = [];

                    // for(let card of data.CardSet){
                    //     let size = card.EffectIndex;
                    //
                    // }

                    let gemArray = [];
                    let equipList = ['000', '001', '002', '003', '004', '005'];
                    let set = '';
                    for (let dt in data.Equip) {
                        if (dt.includes("Gem")) {
                            gemArray.push({
                                "name": data.Equip[dt]['Element_000']['value'].substring(40).replace("</FONT></P>", ""),
                                "value": data.Equip[dt]['Element_004']['value']['Element_001'].replace("<FONT COLOR='#FFD200'>", "").replace("</FONT>", ""),
                                "inline": true
                            })
                            // log(data.Equip[dt]['Element_000']['value'].replace("<P ALIGN='CENTER'><FONT COLOR='#F99200'>","").replace("</FONT></P>",""));
                            // log(data.Equip[dt]['Element_004']['value']['Element_001'].replace("<FONT COLOR='#FFD200'>", "").replace("</FONT>",""));
                        }
                    }

                    detailInfo
                        .setColor("#0099ff")
                        .setTitle(id)
                        .setURL(response.data.url)
                        .addFields(gemArray)
                        .setTimestamp();
                }
                //   channel.send({ embed: exampleEmbed })
            })
            .catch((error) => console.error(error));

        message.channel.send({embeds: [basicInfo]});
        message.channel.send({embeds: [detailInfo]});

    };

    //#endregion
    if (command === "검색") {
        getUsers(args[0])
    }
    if (command === '경매') {
        if (isNaN(args[0])) {
            message.reply('숫자를 입력해주세요');
        } else {
            let price = parseInt(args[0])*0.95;
            const auctionInfo = new MessageEmbed().setColor("#0099ff")
                .setTitle('경매금 계산기')
                .addFields(
                    [
                        {
                            "name": "4인 일때",
                            "value": String(Math.ceil(price - (price / 4))),
                            "inline": false
                        },
                        {
                            "name": "8인 일때",
                            "value": String(Math.ceil(price - (price / 8))),
                            "inline": false
                        }
                    ])
                .setTimestamp();
            message.channel.send({embeds: [auctionInfo]});
        }
    }
    if(command === '명령어'){
        const commandInfo = new MessageEmbed().setColor("#0099ff")
            .setTitle('경매금 계산기')
            .addFields(
                [
                    {
                        "name": "명령어1",
                        "value": "!검색 닉네임",
                        "inline": false
                    },
                    {
                        "name": "명령어2",
                        "value": "!경매 골드",
                        "inline": false
                    }
                ])
            .setTimestamp();
        message.channel.send({embeds: [commandInfo]});
    }
});

// const client = new Discord.Client();
client.login(config.BOT_TOKEN);
