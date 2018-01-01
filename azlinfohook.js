(()=>{
    var doc=document;
    var res={};
    var tables=doc.querySelectorAll(".wikitable tbody");

    res.name=doc.querySelector("#firstHeading").innerText;
    res.class=tables[0].children[3].children[3].children[0].innerText;
    res.country=tables[0].children[2].children[1].children[1].innerText;
    res.rarity=tables[0].children[1].children[4].innerHTML.split("<br>")[0];

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

    //grabbing stats
    var stats={};
    var statrow=tables[1].children[8].children;
    stats.hp=statrow[0].innerText;
    stats.armour=statrow[1].innerText;
    stats.reload=statrow[2].innerText;

    statrow=tables[1].children[9].children;
    stats.gun=statrow[0].innerText;
    stats.torpedo=statrow[1].innerText;
    stats.dodge=statrow[2].innerText;

    statrow=tables[1].children[10].children;
    stats.antiair=statrow[0].innerText;
    stats.planes=statrow[1].innerText;
    stats.gas=statrow[2].innerText;

    stats.speed=tables[1].children[11].innerText.slice(7);

    res.stats=stats;

    console.log(res);
})()