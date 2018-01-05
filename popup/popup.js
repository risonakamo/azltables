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