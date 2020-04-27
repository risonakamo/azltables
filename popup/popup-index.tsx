import ShipTable from "./components/shiptable/shiptable";

import "./popup-index.less";

class PopupIndex extends React.Component
{
  componentDidMount()
  {
    getShip();
  }

  render()
  {
    return <>
      <ShipTable/>
    </>;
  }
}

function main()
{
  ReactDOM.render(<PopupIndex/>,document.querySelector(".main"));
}

function getShip()
{
  chrome.tabs.query({active:true,currentWindow:true,url:"https://azurlane.koumakan.jp/*"},(tab:any)=>{
    chrome.tabs.executeScript({file:"popup/azlinfohook.js"},(res:any)=>{
      console.log(res);
    });
  });
}

window.onload=main;