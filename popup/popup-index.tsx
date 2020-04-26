import ShipTable from "./components/shiptable/shiptable";

import "./popup-index.less";

class PopupIndex extends React.Component
{
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

window.onload=main;