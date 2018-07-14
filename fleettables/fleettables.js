window.onload=main;

var menucontroller;
var _shipClasses;
var _ships=[];
var _fleets=[];
var _fleetsId=0;

function main()
{
    //order of shipclass appearance
    _shipClasses=["DD","CL","CA","BB","BM","BC","BBV","CV","CVL","AR","SS"];
    chrome.storage.local.get(_shipClasses,(data)=>{
        ReactDOM.render(React.createElement(FleetTable,{ships:data,shipClasses:_shipClasses}),document.querySelector(".ftables"));
    });

    chrome.storage.local.get(["fleets","fleetsId"],(data)=>{
        if (data.fleets)
        {
            _fleets=data.fleets;
        }

        if (data.fleetsId)
        {
            _fleetsId=data.fleetsId;
        }

    });
}

function showDatabase()
{
    chrome.storage.local.get(null,(d)=>{
        console.log(d);
    });
}

//due to submarine update asw stats may be missing. use this to force them to "?"
//also updates armour stat for new layout with asw stat
function submarineUpdate()
{
    var shipclassArray;
    chrome.storage.local.get(null,(d)=>{
        for (var x=0;x<_shipClasses.length;x++)
        {
            shipclassArray=d[_shipClasses[x]];
            for (var y=0,l=shipclassArray.length;y<l;y++)
            {
                if (!shipclassArray[y].stats.asw)
                {
                    shipclassArray[y].stats.asw="?";
                }

                shipclassArray[y].stats.armour=armourConvert(shipclassArray[y].stats.armour);
            }
        }

        chrome.storage.local.set(d);
    });
}

//give array of ship names to filter to those ships only
//give it empty array or 0 to show all again
function filterShips(ships)
{
    if (!ships || !ships.length)
    {
        for (var x=0,l=_ships.length;x<l;x++)
        {
            _ships[x].classList.remove("hidden");
        }

        return;
    }

    ships=new Set(ships);

    for (var x=0,l=_ships.length;x<l;x++)
    {
        if (!ships.has(_ships[x].name))
        {
            _ships[x].classList.add("hidden");
        }

        else
        {
            _ships[x].classList.remove("hidden");
        }
    }
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

    return armour;
}