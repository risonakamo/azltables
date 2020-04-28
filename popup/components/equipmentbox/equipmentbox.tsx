import "./equipmentbox.less";

/* EquipmentBox(number[] equipments) */
export default class EquipmentBox extends React.Component
{
  props:{
    equipments:number[]
  }

  render()
  {
    return <div className="equip-box">
      <div className="equip-holder">
        <img className="centre" src={`/imgs/shiptable/equipment/${this.props.equipments[0]}.png`}/>

        <div className="squish">
          <div className="equip-title">EQUIP</div>
          <img className="equipbox-right" src={`/imgs/shiptable/equipment/${this.props.equipments[1]}.png`}/>
        </div>

        <img className="centre squish" src={`/imgs/shiptable/equipment/${this.props.equipments[2]}.png`}/>
      </div>
    </div>;
  }
}