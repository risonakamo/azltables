window.onload=main;

function main()
{
    initButtons();
    chrome.tabs.query({active:true,currentWindow:true},(tab)=>{
        if (tab[0].url.slice(0,28)=="https://azurlane.koumakan.jp")
        {
            chrome.tabs.executeScript({file:"azlinfohook.js"},(res)=>{
                document.querySelector(".current-ship").innerHTML=genShipTable(res[0]);
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

    buttons[1].addEventListener("click",(e)=>{

    });
}