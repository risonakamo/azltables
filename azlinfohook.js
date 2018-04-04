/*
    see localstorage.gql for updated return object definition (the ship object)
    return object:
    {
        string name,
        string class, (ex: "CL" or "DD")
        string country, (currently full country name)
        string rarity,
        string image,
        int remodel, (0=no remodel, 1=yes)
        string torpedoAble, (if ship is torpedo-capable)
        string antiairDD, (if dd is an antiair ship)

        array skills: [
            {string name,description,colour},{..},..
        ],

        object stats:{
            int hp,armour,reload,gun,torpedo,dodge,antiair,planes,gas,speed
        }, (has 10 items)

        object scaling:{
            char gun,hp,antiair,dodge,planes,torpedo
        },

        int-array equipment (integers corresponding to equipment image names)
    }
*/

(()=>{
    var doc=document;
    var res={};
    var tables=doc.querySelectorAll(".wikitable tbody");

    if (!tables)
    {
        return 0;
    }

    res.name=doc.querySelector("#firstHeading").innerText;
    res.class=classConvert(tables[0].children[3].children[1].children[1].innerText);
    res.country=countryConvert(tables[0].children[2].children[1].children[1].innerText);
    res.rarity=rareToColour2(tables[0].children[1].firstElementChild.style.backgroundColor);
    res.image=tables[0].children[1].firstElementChild.firstElementChild.firstElementChild.src;
    res.link=window.location.href;

    //identifying if remodel
    res.remodel=0;
    var tabs=doc.querySelectorAll(".tabbernav li");
    for (var x=0,l=tabs.length;x<l;x++)
    {
        if (tabs[x].innerText=="Remodel")
        {
            res.remodel=1;
        }
    }

    //grabbing skills
    var skilltablerows=tables[3].children;
    var skills=[];
    var skillcolour;
    for (var x=1;x<skilltablerows.length;x++)
    {
        skillcolour=skilltablerows[x].children[2].style.backgroundColor;

        if (!skillcolour || skillcolour=="none" || skillcolour=="None")
        {
            break;
        }

        skills.push({
            name:skilltablerows[x].children[2].innerText,
            description:skilltablerows[x].children[3].innerText,
            colour:convertSkillColour(skillcolour)
        });
    }

    res.skills=skills;

    var stattablerows=tables[1].children;

    //grabbing stats
    var stats={};
    var statrow=stattablerows[8].children;
    stats.hp=statrow[0].innerText.split("→").pop();
    stats.armour=statrow[1].innerText;
    stats.reload=statrow[2].innerText.split("→").pop();

    statrow=stattablerows[9].children;
    stats.gun=statrow[0].innerText.split("→").pop();
    stats.torpedo=statrow[1].innerText.split("→").pop();
    stats.dodge=statrow[2].innerText.split("→").pop();

    statrow=stattablerows[10].children;
    stats.antiair=statrow[0].innerText.split("→").pop();
    stats.planes=statrow[1].innerText.split("→").pop();
    stats.gas=statrow[2].innerText.split("→").pop();

    stats.speed=stattablerows[11].innerText.slice(7).split("→").pop();

    res.stats=stats;

    //getting scalings
    var scaling={};
    scaling.gun=stattablerows[1].children[0].innerText.slice(-1);
    scaling.hp=stattablerows[2].children[0].innerText.slice(-1);
    scaling.antiair=stattablerows[3].children[0].innerText.slice(-1);
    scaling.dodge=stattablerows[4].children[0].innerText.slice(-1);
    scaling.planes=stattablerows[5].children[0].innerText.slice(-1);
    scaling.torpedo=stattablerows[6].children[0].innerText.slice(-1);

    res.scaling=scaling;

    //check torpedo capable
    if (parseInt(stats.torpedo))
    {
        res.torpedoAble=1;
    }

    //check if antiair dd
    if (res.class=="DD" &&
        (scaling.antiair=="C" || scaling.antiair=="B" || scaling.antiair=="A"))
    {
        res.antiairDD=1;
    }

    //grab equipment
    var equiptable=tables[4].children;
    res.equipment=[];
    res.equipment.push(equipTexttoNum(equiptable[2].children[3].innerText));
    res.equipment.push(equipTexttoNum(equiptable[3].children[3].innerText));
    res.equipment.push(equipTexttoNum(equiptable[4].children[3].innerText));

    console.log(res);
    return res;
})()

function equipTexttoNum(text)
{
    switch (text)
    {
        case "DD Main Guns":
        return 0;

        case "CA Main Guns":
        return 1;

        case "BB Main Guns":
        return 2;

        case "CL Main Guns":
        return 3;

        case "Torpedoes":
        case "Torpedo":
        return 4;

        case "Fighter":
        return 5;

        case "Dive Bomber":
        return 6;

        case "Torpedo Bomber":
        return 7;

        case "Auxiliary Equipment":
        return 8;

        case "Anti-Air Guns":
        return 9;

        case "DD/CL Main Guns (Seaplane on retrofit)":
        case "DD/CL Main Guns":
        case "CL Guns, DD guns":
        return 11;
    }

    return 12;
}

function convertSkillColour(colour)
{
    switch (colour)
    {
        case "gold":
        return "yellow";

        case "deepskyblue":
        return "blue";

        case "pink":
        return "red";
    }

    return "";
}

//not working after wiki changed to using stars and an image for rarity
function rareToColour(rarity)
{
    switch (rarity)
    {
        case "Elite":
        return "purple";

        case "Super Rare":
        return "gold";

        case "Rare":
        return "blue";

        case "Normal":
        return "grey";
    }
}

function rareToColour2(rarity)
{
    switch (rarity)
    {
        case "plum":
        return "purple";

        case "palegoldenrod":
        return "gold";

        case "powderblue":
        return "blue";

        case "gainsboro":
        return "grey";
    }
}

function countryConvert(country)
{
    switch (country)
    {
        case "Metalblood":
        return "de";

        case "Royal Navy":
        return "en";

        case "Sakura Empire":
        return "jp";

        case "Eagle Union":
        return "us";

        case "Neptunia":
        return "nep";

        case "Eastern Radiance":
        return "cn";
    }

    return "missing";
}

function classConvert(shipclass)
{
    switch (shipclass)
    {
        case "Destroyer":
        return "DD";

        case "Light Cruiser":
        return "CL";

        case "Heavy Cruiser":
        return "CA";

        case "Battleship":
        return "BB";

        case "Monitor":
        return "BM";

        case "Battlecruiser":
        return "BC";

        case "Aircraft Carrier":
        return "CV";

        case "Light Aircraft Carrier":
        return "CVL";

    }
}