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
    var tables=doc.querySelectorAll(".wikitable>tbody");
    console.log(tables);

    //input the index of the table related to the corresponding key. whatever that means???
    var tableIndexes={
        countryClass:1,
        rarity:0,
        stats:3 //number for first table of stats

        //these need to be recalulated
        //after detecting number of stat tables:
        // equipment:?
        // skills:?
    };

    if (!tables)
    {
        return 0;
    }

    res.name=doc.querySelector("#firstHeading").innerText;
    res.class=classConvert(tables[tableIndexes.countryClass].children[2].children[1].lastElementChild.innerText);
    res.country=countryConvert(tables[tableIndexes.countryClass].children[1].children[1].children[1].innerText);
    res.rarity=rareToColour2(tables[tableIndexes.rarity].children[1].children[1].style.backgroundColor);
    res.image=doc.querySelector(".image").firstElementChild.src;
    res.link=window.location.href;

    //get stats
    getStats(tables,res,tableIndexes);

    //grabbing skills
    getSkills(tables,res,tableIndexes);

    //grab equipment
    getEquips(tables,res,tableIndexes);

    getAdditional(tables,res,tableIndexes);

    console.log(res);
    return res;
})()

//convert equipment string to number of equipment used for
//equipment images
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
        case "Fighters":
        return 5;

        case "Dive Bomber":
        case "Dive Bombers":
        return 6;

        case "Torpedo Bomber":
        case "Torpedo Bombers":
        return 7;

        case "Auxiliary Equipment":
        case "Auxilliary":
        return 8;

        case "Anti-Air Guns":
        return 9;

        case "DD/CL Main Guns (Seaplane on retrofit)":
        case "DD/CL Main Guns":
        case "CL/DD Main Guns":
        case "CL Guns, DD guns":
        return 11;

        case "CL Main Guns (CA Main Guns on retrofit)":
        return 13;
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

//convert css rarity colour to actual rarity colour
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

//convert country string to shortened country string
function countryConvert(country)
{
    switch (country)
    {
        case "Sakura Empire":
        return "jp";

        case "Metalblood":
        case "Ironblood":
        return "de";

        case "Royal Navy":
        return "en";

        case "Eagle Union":
        return "us";

        case "Iris Libre":
        return "fr";

        case "Vichya Dominion":
        return "vfr";

        case "Neptunia":
        return "nep";

        case "Eastern Radiance":
        return "cn";
    }

    return "missing";
}

//convert class string
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

        case "Submarine":
        return "SS";

        case "Repair Ship":
        return "AR";

        case "Aviation Battleship":
        return "BBV";
    }
}

//give it the root element of a table of stats
function extractStats(stattablerows,sclass="")
{
    stattablerows=stattablerows.children;

    //grabbing stats
    var stats={};
    var statrow=stattablerows[0].children;
    stats.hp=statrow[0].innerText;
    stats.armour=armourConvert(statrow[1].innerText.trim());
    stats.reload=statrow[2].innerText;

    statrow=stattablerows[1].children;
    stats.gun=statrow[0].innerText;
    stats.torpedo=statrow[1].innerText;
    stats.dodge=statrow[2].innerText;

    statrow=stattablerows[2].children;
    stats.antiair=statrow[0].innerText;
    stats.planes=statrow[1].innerText;
    stats.gas=statrow[2].innerText;

    if (sclass!="SS")
    {
        stats.asw=stattablerows[3].firstElementChild.innerText;
    }

    else
    {
        statrow=stattablerows[3].children;
        stats.oxy=statrow[0].innerText;
        stats.ammo=statrow[1].innerText;
    }

    stats.speed=stattablerows[4].children[1].innerText;

    var scaling={};
    var reg=/ ?(\d+→)?(\d+)(\s?\((\w)(\s?→\s?(\w))?\))?/;
    var regmatch;
    for (var x in stats)
    {
        if (x=="armour")
        {
            continue;
        }

        regmatch=stats[x].match(reg);

        //in rare case that stats are empty, or it is now on
        //the 2nd page as there were no scalings on the first
        if (!regmatch)
        {
            stats[x]="";
            continue;
        }

        stats[x]=regmatch[2];

        if (regmatch[4])
        {
            scaling[x]=regmatch[4];
        }
    }

    return {stats:stats,scaling:scaling};
}

function armourConvert(armour)
{
    switch (armour)
    {
        case " Light":
        case "Light":
        return "軽";

        case " Medium":
        case "Medium":
        return "中";

        case " Heavy":
        case "Heavy":
        return "重";
    }

    return "err";
}

function getStats(tables,res,tableIndexes)
{
    var numStatTables=document.querySelectorAll(".tabbernav")[1].querySelectorAll("li").length;
    console.log(numStatTables);

    var maxStats;
    var currentStats;
    for (var x=0;x<numStatTables;x++)
    {
        currentStats=extractStats(tables[tableIndexes.stats+x],res.class);

        if (currentStats.stats.hp!="" && (!maxStats || parseInt(currentStats.stats.hp)>parseInt(maxStats.stats.hp)))
        {
            maxStats=currentStats;
        }
    }

    res.scaling=maxStats.scaling;
    res.stats=maxStats.stats;

    //calculate equipment and skill table index based on number of stat tables found
    tableIndexes.equipment=tableIndexes.stats+numStatTables;
    tableIndexes.skills=tableIndexes.equipment+1;
}

function getEquips(tables,res,tableIndexes)
{
    var equiptable=tables[tableIndexes.equipment].children;
    res.equipment=[];
    res.equipment.push(equipTexttoNum(equiptable[2].children[2].innerText));
    res.equipment.push(equipTexttoNum(equiptable[3].children[2].innerText));
    res.equipment.push(equipTexttoNum(equiptable[4].children[2].innerText));
}

function getSkills(tables,res,tableIndexes)
{
    var skilltablerows=tables[tableIndexes.skills].children;
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
}

function getAdditional(tables,res,tableIndexes)
{
    //if scalings werent on the first page of stats, try the second (rare case)
    //of course, only take the scalings
    if (!res.scaling.hp)
    {
        console.log("scalings missing on first tab");
        res.scaling=extractStats(tables[tableIndexes.stats+1]).scaling;
    }

    //work around for rare armour 0 case
    if (res.stats.armour=="err")
    {
        res.stats.armour=armourConvert(tables[tableIndexes.stats+1].children[0].children[1].innerText);
    }

    //check torpedo capable
    if (parseInt(res.stats.torpedo))
    {
        res.torpedoAble=1;
    }

    //check if antiair dd
    if (res.class=="DD" &&
        (res.scaling.antiair=="C" || res.scaling.antiair=="B" || res.scaling.antiair=="A"))
    {
        res.antiairDD=1;
    }
}