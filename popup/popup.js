window.onload=main;

function main()
{
    chrome.tabs.query({active:true,currentWindow:true},(tab)=>{
        if (tab[0].url.slice(0,28)=="https://azurlane.koumakan.jp")
        {
            chrome.tabs.executeScript({file:"azlinfohook.js"},(res)=>{
                // document.body.innerHTML=JSON.stringify(res);

                document.body.innerHTML=genShipTable(res[0]);
            });
        }
    });
}

function genShipTable(data)
{
    var skillsString="";
    for (var x=0;x<data.skills.length;x++)
    {
        skillsString+=genSkill(data.skills[x]);
    }

    //see shiptable-gen.html for gen string
    return `<div class="ship-table"><div class="title-box"><img src="us.png"> <span>${data.name}</span></div><div class="bottom"><div class="left"><div class="portrait-zone"><div class="class-box ${data.class}">${genClassString(data.class,data.antiairDD,data.torpedoAble,data.remodel)}</div><img src="${data.image}"></div><div class="equip-box"><div class="equip-holder"><img class="centre" src="equipment/${data.equipment[0]}.png"><div class="squish"><div class="equip-title">EQUIP</div><img class="equipbox-right" src="equipment/${data.equipment[1]}.png"></div><img class="centre squish" src="equipment/${data.equipment[2]}.png"></div></div></div><div class="right-right"><div class="title-bar">STAT</div><div class="stat-list"><div class="statbox ${data.scaling.hp}"><div class="img-holder"><div class="scalestat hp"></div></div><div class="text">${data.stats.hp}</div></div><div class="statbox ${data.scaling.gun}"><div class="img-holder"><div class="scalestat gun"></div></div><div class="text">${data.stats.gun}</div></div><div class="statbox ${data.scaling.torpedo}"><div class="img-holder"><div class="scalestat torp"></div></div><div class="text">${data.stats.torpedo}</div></div><div class="statbox ${data.scaling.dodge}"><div class="img-holder"><div class="scalestat dodge"></div></div><div class="text">${data.stats.dodge}</div></div><div class="statbox ${data.scaling.planes}"><div class="img-holder"><div class="scalestat plane"></div></div><div class="text">${data.stats.planes}</div></div><div class="statbox ${data.scaling.antiair}"><div class="img-holder"><div class="scalestat aa"></div></div><div class="text">${data.stats.antiair}</div></div><div class="statbox"><div class="img-holder"><img src="icon/reload.png"></div><div class="text">${data.stats.reload}</div></div><div class="statbox"><div class="img-holder"><img src="icon/speed.png"></div><div class="text">${data.stats.speed}</div></div><div class="statbox"><div class="img-holder"><img src="icon/gas.png"></div><div class="text">${data.stats.gas}</div></div><div class="statbox armour"><div class="img-holder"><img src="icon/armour.png"></div><div class="text">${data.stats.armour}</div></div></div></div><div class="right"><div class="skill-zone">${skillsString}</div></div></div></div>`;
}

//given skill object, returns html for a SINGLE skill
function genSkill(skill)
{
    //gen string from shiptable-gen.html
    return `<div class="skill-box"><div class="name ${skill.colour}">${skill.name}</div><div class="description">${skill.description}</div></div>`;
}

//generates stuff inside shiptable-gen.html
function genClassString(sclass,aa,torp,kai)
{
    var res="";
    res+=`<img src="class/${sclass}.png">`;

    if (sclass!="DD" && torp)
    {
        res+=`<img src="class/DD.png">`;
    }

    if (sclass=="DD" && aa)
    {
        res+=`<img src="class/CL.png">`;
    }

    res+=`<div class="label">${sclass}</div>`;

    if (kai)
    {
        res+=`<div class="label">改</div>`;
    }

    return res;
}