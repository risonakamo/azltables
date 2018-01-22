window.onload=main;

var menucontroller;
var _shipClasses;
var _ships=[];
var _fleets=[];
var _fleetsId=0;

function main()
{
    var ftables=document.querySelector(".ftables");
    _shipClasses=["DD","CL","CA","BB","BM","BC","CV","CVL","AR"];
    chrome.storage.local.get(_shipClasses,(data)=>{
        var currentClassShips;
        var currentShip;
        for (var x=0;x<_shipClasses.length;x++)
        {
            currentClassShips=data[_shipClasses[x]];

            if (!currentClassShips)
            {
                continue;
            }

            for (var y=0;y<currentClassShips.length;y++)
            {
                // ftables.insertAdjacentHTML("beforeend",genShipTable(currentClassShips[y]));

                currentShip=genShipTableElement(currentClassShips[y]);
                _ships.push(currentShip);
                ftables.appendChild(currentShip);
            }
        }

        menucontroller=new _menucontroller;
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

        menucontroller.initFleetMenu();
    });
}

function showDatabase()
{
    chrome.storage.local.get(null,(d)=>{
        console.log(d);
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