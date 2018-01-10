window.onload=main;

var menucontroller;
var _shipClasses;
var _ships=[];
var _fleets;

function main()
{
    var ftables=document.querySelector(".ftables");
    _shipClasses=["DD","CL","CA","BB","BM","CV","CVL","AR"];
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

    chrome.storage.local.get("fleets",(data)=>{
        if (data.fleets)
        {
            _fleets=data.fleets;
        }

        else
        {
            _fleets=[];
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