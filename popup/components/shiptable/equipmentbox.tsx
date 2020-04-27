import "./equipmentbox.less";

export default class EquipmentBox extends React.Component
{
  render()
  {
    return <div className="equip-box">
      <div className="equip-holder">
        <img className="centre" src="/imgs/shiptable/equipment/0.png"/>

        <div className="squish">
          <div className="equip-title">EQUIP</div>
          <img className="equipbox-right" src="/imgs/shiptable/equipment/4.png"/>
        </div>

        <img className="centre squish" src="/imgs/shiptable/equipment/9.png"/>
      </div>
    </div>;
  }
}