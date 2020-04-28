import ShipTable from "./components/shiptable/shiptable";

import "./popup-index.less";

interface PopupIndexProps
{

}

interface PopupIndexState
{
  loadedShip?:ShipInfo
}

class PopupIndex extends React.Component
{
  props:PopupIndexProps
  state:PopupIndexState

  constructor(props:PopupIndexProps)
  {
    super(props);

    this.state={
      loadedShip:undefined
    };
  }

  async componentDidMount()
  {
    var gotShip=await getShip();
    if (gotShip)
    {
      this.setState({loadedShip:gotShip});
    }
  }

  render()
  {
    var renderingShip;
    if (this.state.loadedShip)
    {
      renderingShip=<ShipTable shipdata={this.state.loadedShip}/>;
    }

    return <>
      {renderingShip}
    </>;
  }
}

function main()
{
  ReactDOM.render(<PopupIndex/>,document.querySelector(".main"));
}

// return a ship info from the current page, or nothing if page is not correct
function getShip():Promise<ShipInfo|null>
{
  return new Promise((resolve)=>{
    chrome.tabs.query({
      active:true,
      currentWindow:true,
      url:"https://azurlane.koumakan.jp/*"
    },(tabs:Tab[])=>{
      if (tabs && tabs.length)
      {
        chrome.tabs.executeScript({file:"/popup/azlinfohook.js"},(res:ShipInfo[])=>{
          resolve(res[0]);
        });
      }

      else
      {
        resolve(null);
      }
    });
  });
}

window.onload=main;