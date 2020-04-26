import "./popup-index.less";

class PopupIndex extends React.Component
{
  render()
  {
    return <div>hi</div>;
  }
}

function main()
{
  ReactDOM.render(<PopupIndex/>,document.querySelector(".main"));
}

window.onload=main;