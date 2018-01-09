window.onload=main;

var menucontroller;
var _shipClasses;

function main()
{
    var ftables=document.querySelector(".ftables");
    _shipClasses=["DD","CL","CA","BB","BM","CV","CVL","AR"];
    chrome.storage.local.get(_shipClasses,(data)=>{
        var currentClassShips;
        for (var x=0;x<_shipClasses.length;x++)
        {
            currentClassShips=data[_shipClasses[x]];

            if (!currentClassShips)
            {
                continue;
            }

            for (var y=0;y<currentClassShips.length;y++)
            {
                ftables.insertAdjacentHTML("beforeend",genShipTable(currentClassShips[y]));
            }
        }

        menucontroller=new _menucontroller;
    });
}

function showDatabase()
{
    chrome.storage.local.get(null,(d)=>{
        console.log(d);
    });
}