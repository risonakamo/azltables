window.onload=main;

var menucontroller;

function main()
{
    var ftables=document.querySelector(".ftables");
    var shipClasses=["DD","CL","CA","BB","BM","CV","CVL","AR"];
    chrome.storage.local.get(shipClasses,(data)=>{
        var currentClassShips;
        for (var x=0;x<shipClasses.length;x++)
        {
            currentClassShips=data[shipClasses[x]];

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