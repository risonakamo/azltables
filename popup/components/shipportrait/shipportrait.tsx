import "./shipportrait.less";

export default class ShipPortrait extends React.Component
{
  render()
  {
    return <div className="portrait-zone purple">
      <ClassBox/>
      <img className="portrait" src="https://azurlane.koumakan.jp/w/images/7/7d/KasumiIcon.png"/>
    </div>;
  }
}

class ClassBox extends React.Component
{
  render()
  {
    return <div className="class-box DD">
      <img src="/imgs/shiptable/class/dd.png"/>
      <div className="label">DD</div>
    </div>;
  }
}