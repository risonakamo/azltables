/*
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
        }
    }
*/

(()=>{
    var doc=document;
    var res={};
    var tables=doc.querySelectorAll(".wikitable tbody");

    res.name=doc.querySelector("#firstHeading").innerText;
    res.class=tables[0].children[3].children[3].firstElementChild.innerText;
    res.country=tables[0].children[2].children[1].children[1].innerText;
    res.rarity=tables[0].children[1].children[4].innerHTML.split("<br>")[0];
    res.image=tables[0].children[1].firstElementChild.firstElementChild.firstElementChild.src;

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
            colour:skillcolour
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

    stats.speed=stattablerows[11].innerText.slice(7);

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

    console.log(res);
    return res;
})()