window.onload=main;

var _currentShip;

function main()
{
    initButtons();
    chrome.tabs.query({active:true,currentWindow:true},(tab)=>{
        if (tab[0].url.slice(0,28)=="https://azurlane.koumakan.jp")
        {
            chrome.tabs.executeScript({file:"azlinfohook.js"},(res)=>{
                _currentShip=res[0];

                if (!_currentShip)
                {
                    return;
                }

                document.querySelector(".current-ship").innerHTML=genShipTable(_currentShip);
            });
        }
    });
}

function initButtons()
{
    var buttons=document.querySelectorAll(".button");

    buttons[0].addEventListener("click",(e)=>{
        chrome.tabs.create({
            url:"fleettables/fleettables.html"
        });
    });

    var button1Text=buttons[1].querySelector("span");
    buttons[1].addEventListener("click",(e)=>{
        chrome.storage.local.get(_currentShip.class,(data)=>{
            var d=data[_currentShip.class];

            if (!d)
            {
                d=[];
            }

            var alreadyExist=0;
            for (var x=0,l=d.length;x<l;x++)
            {
                if (d[x].name==_currentShip.name)
                {
                    d[x]=_currentShip;
                    alreadyExist=1;
                    break;
                }
            }

            if (!alreadyExist)
            {
                d.push(_currentShip);
            }

            data[_currentShip.class]=d;
            chrome.storage.local.set(data);

            buttons[1].classList.add("complete");
            button1Text.innerText="saved";
        });
    });
}