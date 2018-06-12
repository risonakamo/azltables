//takes in a single ship object
function genShipTable(data)
{
    var skillsString="";
    for (var x=0;x<data.skills.length;x++)
    {
        skillsString+=genSkill(data.skills[x]);
    }

    //see shiptable-gen.html for gen string
    return `<div class="ship-table"><div class="title-box"><img src="/shiptable/country/${data.country}.png" class="${data.country}"><a href="${data.link}">${data.name}</a></div><div class="bottom"><div class="left"><div class="portrait-zone ${data.rarity}"><div class="class-box ${data.class}">${genClassString(data.class,data.antiairDD,data.torpedoAble,data.remodel)}</div><img class="portrait" src="${data.image}"></div><div class="equip-box"><div class="equip-holder"><img class="centre" src="/shiptable/equipment/${data.equipment[0]}.png"><div class="squish"><div class="equip-title">EQUIP</div><img class="equipbox-right" src="/shiptable/equipment/${data.equipment[1]}.png"></div><img class="centre squish" src="/shiptable/equipment/${data.equipment[2]}.png"></div></div></div><div class="right-right"><div class="title-bar">STAT</div><div class="stat-list"><div class="statbox ${data.scaling.hp}" title="hp ${data.scaling.hp}"><div class="img-holder"><div class="scalestat hp"></div></div><div class="text">${data.stats.hp}</div></div><div class="statbox ${data.scaling.gun}" title="gun ${data.scaling.gun}"><div class="img-holder"><div class="scalestat gun"></div></div><div class="text">${data.stats.gun}</div></div><div class="statbox ${data.scaling.torpedo}" title="torpedo ${data.scaling.torpedo}"><div class="img-holder"><div class="scalestat torp"></div></div><div class="text">${data.stats.torpedo}</div></div><div class="statbox ${data.scaling.dodge}" title="dodge ${data.scaling.dodge}"><div class="img-holder"><div class="scalestat dodge"></div></div><div class="text">${data.stats.dodge}</div></div><div class="statbox ${data.scaling.planes}" title="air power ${data.scaling.planes}"><div class="img-holder"><div class="scalestat plane"></div></div><div class="text">${data.stats.planes}</div></div><div class="statbox ${data.scaling.antiair}" title="antiair ${data.scaling.antiair}"><div class="img-holder"><div class="scalestat aa"></div></div><div class="text">${data.stats.antiair}</div></div><div class="statbox" title="reload"><div class="img-holder"><img src="/shiptable/icon/reload.png"></div><div class="text">${data.stats.reload}</div></div><div class="statbox" title="speed"><div class="img-holder"><img src="/shiptable/icon/speed.png"></div><div class="text">${data.stats.speed}</div></div><div class="statbox" title="gas"><div class="img-holder"><img src="/shiptable/icon/gas.png"></div><div class="text">${data.stats.gas}</div></div><div class="statbox" title="anti sub"><div class="img-holder"><img src="/shiptable/icon/asw.png"></div><div class="text">${data.stats.asw}</div></div><div class="statbox" title="armour"><div class="img-holder"><img src="/shiptable/icon/armour.png"></div><div class="text">${data.stats.armour}</div></div></div></div><div class="right"><div class="skill-zone">${skillsString}</div></div></div></div>`;
}

//element version of genShipTable, the element has name and class data binded
function genShipTableElement(data)
{
    var res=document.createElement("div");
    res.classList.add("ship-table");

    var skillsString="";
    for (var x=0;x<data.skills.length;x++)
    {
        skillsString+=genSkill(data.skills[x]);
    }

    res.innerHTML=`<div class="ship-table"><div class="title-box"><img src="/shiptable/country/${data.country}.png" class="${data.country}"><a href="${data.link}">${data.name}</a></div><div class="bottom"><div class="left"><div class="portrait-zone ${data.rarity}"><div class="class-box ${data.class}">${genClassString(data.class,data.antiairDD,data.torpedoAble,data.remodel)}</div><img class="portrait" src="${data.image}"></div><div class="equip-box"><div class="equip-holder"><img class="centre" src="/shiptable/equipment/${data.equipment[0]}.png"><div class="squish"><div class="equip-title">EQUIP</div><img class="equipbox-right" src="/shiptable/equipment/${data.equipment[1]}.png"></div><img class="centre squish" src="/shiptable/equipment/${data.equipment[2]}.png"></div></div></div><div class="right-right"><div class="title-bar">STAT</div><div class="stat-list"><div class="statbox ${data.scaling.hp}" title="hp ${data.scaling.hp}"><div class="img-holder"><div class="scalestat hp"></div></div><div class="text">${data.stats.hp}</div></div><div class="statbox ${data.scaling.gun}" title="gun ${data.scaling.gun}"><div class="img-holder"><div class="scalestat gun"></div></div><div class="text">${data.stats.gun}</div></div><div class="statbox ${data.scaling.torpedo}" title="torpedo ${data.scaling.torpedo}"><div class="img-holder"><div class="scalestat torp"></div></div><div class="text">${data.stats.torpedo}</div></div><div class="statbox ${data.scaling.dodge}" title="dodge ${data.scaling.dodge}"><div class="img-holder"><div class="scalestat dodge"></div></div><div class="text">${data.stats.dodge}</div></div><div class="statbox ${data.scaling.planes}" title="air power ${data.scaling.planes}"><div class="img-holder"><div class="scalestat plane"></div></div><div class="text">${data.stats.planes}</div></div><div class="statbox ${data.scaling.antiair}" title="antiair ${data.scaling.antiair}"><div class="img-holder"><div class="scalestat aa"></div></div><div class="text">${data.stats.antiair}</div></div><div class="statbox" title="reload"><div class="img-holder"><img src="/shiptable/icon/reload.png"></div><div class="text">${data.stats.reload}</div></div><div class="statbox" title="speed"><div class="img-holder"><img src="/shiptable/icon/speed.png"></div><div class="text">${data.stats.speed}</div></div><div class="statbox" title="gas"><div class="img-holder"><img src="/shiptable/icon/gas.png"></div><div class="text">${data.stats.gas}</div></div><div class="statbox" title="anti sub"><div class="img-holder"><img src="/shiptable/icon/asw.png"></div><div class="text">${data.stats.asw}</div></div><div class="statbox" title="armour"><div class="img-holder"><img src="/shiptable/icon/armour.png"></div><div class="text">${data.stats.armour}</div></div></div></div><div class="right"><div class="skill-zone">${skillsString}</div></div></div></div>`;

    res.name=data.name;
    res.class=data.class;

    return res;
}

//given skill object, returns html for a SINGLE skill
function genSkill(skill)
{
    //gen string from shiptable-gen.html
    return `<div class="skill-box"><div class="name ${skill.colour}">${skill.name}</div><div class="description">${skill.description}</div></div>`;
}

//helper for genShipTable generates stuff inside shiptable-gen.html
function genClassString(sclass,aa,torp,kai)
{
    var res="";
    res+=`<img src="/shiptable/class/${sclass}.png">`;

    if (sclass!="DD" && torp)
    {
        res+=`<img src="/shiptable/class/DD.png">`;
    }

    if (sclass=="DD" && aa)
    {
        res+=`<img src="/shiptable/class/CL.png">`;
    }

    res+=`<div class="label">${sclass}</div>`;

    if (kai)
    {
        res+=`<div class="label">改</div>`;
    }

    return res;
}