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

function main()
{
    var doc=document;
    var res={};
    var tables=doc.querySelectorAll(".wikitable>tbody");
    // console.log(tables);

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

    console.log(tables);
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
    var statScales=getStatsScalings2(res.class);
    res.stats=statScales.stats;
    res.scaling=statScales.scaling;

    //grabbing skills
    getSkills(tables,res,tableIndexes);

    //grab equipment
    getEquips(tables,res,tableIndexes);

    getAdditional(tables,res,tableIndexes);

    checkKai(res);

    console.log(res);
    return res;
}

//convert equipment string to number of equipment used for
//equipment images
function equipTexttoNum(text)
{
    switch (text)
    {
        case "DD Main Guns":
        case "DD Guns":
        return 0;

        case "CA Main Guns":
        case "CA Guns":
        return 1;

        case "BB Main Guns":
        case "BB Guns":
        return 2;

        case "CL Main Guns":
        case "CL Guns":
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
        case "DD/CL Guns":
        return 11;

        case "CL Main Guns (CA Main Guns on retrofit)":
        case "CL Guns (CA Guns on retrofit)":
        case "CL Main Guns (CA on retrofit)":
        case "CL/CA Main Guns":
        case "CL/CA Guns":
        return 13;

        case "Submarine Torpedoes":
        return 14;

        case "Dive Bomber/CL Main Guns":
        case "Dive Bomber / CL Guns":
        return 15;
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

        case "North Union":
        return "ru";

        case "Utawarerumono":
        return "uta";
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
    // console.log(numStatTables);

    /* let new stat grabber handle this part
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
    */

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

//detect if remodel. sets remodel on given res object
function checkKai(res)
{
    var tabbernavs=document.querySelectorAll(".tabbernav li");
    for (var x=0,l=tabbernavs.length;x<l;x++)
    {
        if (tabbernavs[x].innerText=="Retrofit")
        {
            res.remodel=1;
            return;
        }
    }
}

var statOrderNormal=["hp","armour","reload","gun","torpedo",
    "dodge","antiair","planes","gas","asw","speed"];

var statOrderSub=["hp","armour","reload","gun","torpedo",
    "dodge","antiair","planes","gas","oxy","ammo"];

var statCellLength=13; //the correct number of stat cells in a full stat table

//grab stats and scalings and return object with stats and scalings
//configure with above global variables
function getStatsScalings2(shipClass)
{
    var statTables=document.querySelectorAll(".tabber")[1].querySelectorAll("tbody");

    var statCells; //the current stat cells going over

    var cell; //the text of the current statcell
    var stat; //the current stat string text
    var statCellSplit; //the text of the current cell, split into stat and scaling

    var res={asw:0};
    var resScales={};
    for (var x=0,l=statTables.length;x<l;x++)
    {
        //get all cells for each table of stats
        statCells=statTables[x].querySelectorAll("td");

        //loop over all cells and statOrder at same time
        //statOrder should be the order cell stats appear in
        for (var y=0,ly=statCells.length;y<=ly;y++)
        {
            cell=processCell2(statCells[y]);

            if (!cell)
            {
                continue;
            }

            stat=cell.stat; //set to the stat name that we are possibly about to update in res
            cell=cell.value; //set to the text in the current cell

            //if the current stat being set is armour, do this specific stuff
            if (stat=="armour" && !res.armour && cell)
            {
                res.armour=armourConvert(cell);
                continue;
            }

            //handle the value for possible scalings
            statCellSplit=[cell.match(/\d+/),cell.match(/[A-Z]/)]; //[stat value,scaling value]

            //if there is a stat number, set it if it is higher that the one currently in the result stats
            if (statCellSplit[0])
            {
                statCellSplit[0]=parseInt(statCellSplit[0]);
                if (!res[stat] || statCellSplit[0]>res[stat])
                {
                    res[stat]=statCellSplit[0];
                }
            }

            //set a scaling, if it is better than one already set
            if (statCellSplit[1])
            {
                statCellSplit[1]=statCellSplit[1][0];
                if (!resScales[stat] || statCellSplit[1]<resScales[stat])
                {
                    resScales[stat]=statCellSplit[1];
                }
            }
        }
    }

    return {stats:res,scaling:resScales};
}

/*given a cell element, return an object:
  {
    value:the stat text, without additional parsing (so the scaling might still be there),
    stat:text of the stat that should be set inside of the
         final stats object
  }, for example:
  {value:500,stat:"torpedo"}*/
function processCell(cell)
{
    if (!cell)
    {
        return;
    }

    if (cell.firstChild && cell.firstChild.nodeName=="IMG")
    {
        var res={};

        console.log(cell.firstChild.alt);

        switch (cell.firstChild.alt.replace(/\s/g," "))
        {
            case "Health":
            res.stat="hp";
            break;

            case "Armor type":
            res.stat="armour";
            break;

            case "Reload":
            res.stat="reload";
            break;

            case "Firepower":
            res.stat="gun";
            break;

            case "Torpedo":
            res.stat="torpedo";
            break;

            case "Evasion":
            res.stat="dodge";
            break;

            case "Anti-Air":
            res.stat="antiair";
            break;

            case "Air Power":
            res.stat="planes";
            break;

            case "Oil consumption":
            res.stat="gas";
            break;

            case "Anti-Submarine Warfare":
            res.stat="asw";
            break;

            case "Oxygen":
            res.stat="oxy";
            break;

            case "Amount of Ammunition":
            res.stat="ammo";
            break;

            case "Luck":
            res.stat="luck";
            break;

            default:
            return null;
        }

        res.value=cell.innerText.trim();
    }

    else if (cell.previousElementSibling && cell.previousElementSibling.nodeName=="TH")
    {
        var res={};

        switch (cell.previousElementSibling.innerText.trim())
        {
            case "Speed":
            res.stat="speed";
            break;

            default:
            return null;
        }

        res.value=cell.innerText.trim();
    }

    return res;
}

//new version after wiki changed up cell formatting
function processCell2(cell)
{
    if (!cell)
    {
        return;
    }

    var res={};

    if (cell.previousElementSibling &&
        cell.previousElementSibling.firstElementChild &&
        cell.previousElementSibling.firstElementChild.nodeName=="IMG")
    {
        switch (cell.previousElementSibling.firstElementChild.alt.replace(/\s/g," "))
        {
            case "Health":
            res.stat="hp";
            break;

            case "Armor":
            res.stat="armour";
            break;

            case "Reload":
            res.stat="reload";
            break;

            case "Firepower":
            res.stat="gun";
            break;

            case "Torpedo":
            res.stat="torpedo";
            break;

            case "Evasion":
            res.stat="dodge";
            break;

            case "Anti-Air":
            res.stat="antiair";
            break;

            case "Aviation":
            res.stat="planes";
            break;

            case "Oil Consumption":
            res.stat="gas";
            break;

            case "Anti-Submarine Warfare":
            res.stat="asw";
            break;

            case "Oxygen":
            res.stat="oxy";
            break;

            case "Amount of Ammunition":
            res.stat="ammo";
            break;

            case "Luck":
            res.stat="luck";
            break;

            default:
            return null;
        }

        res.value=cell.innerText.trim();
        return res;
    }

    else if (cell.previousElementSibling && cell.previousElementSibling.nodeName=="TH")
    {
        switch (cell.previousElementSibling.innerText.trim())
        {
            case "Spd":
            res.stat="speed";
            break;

            default:
            return null;
        }

        res.value=cell.innerText.trim();
        return res;
    }
}

main();