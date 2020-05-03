import ShipPortrait from "../shipportrait/shipportrait";
import EquipmentBox from "../equipmentbox/equipmentbox";
import StatList from "../statlist/statlist";
import SkillZone from "../skillzone/skillzone";

import "./shiptable.less";

interface ShipTableProps
{
  shipdata:ShipInfo
}

/* ShipTable(ShipInfo shipdata) */
export default class ShipTable extends React.Component
{
  props:ShipTableProps

  render()
  {
    return <div className="ship-table">
      <div className="title-box">
        <img src={`/imgs/shiptable/country/${this.props.shipdata.country}.png`}/>
        <a href={this.props.shipdata.link}>{this.props.shipdata.name}</a>
      </div>

      <div className="bottom">
        <div className="left">
          <ShipPortrait img={this.props.shipdata.image} shipclass={this.props.shipdata.class}
            shiprare={this.props.shipdata.rarity}/>
          <EquipmentBox equipments={this.props.shipdata.equipment}/>
        </div>

        <div className="right-right">
          <div className="title-bar">STAT</div>

          <StatList stats={this.props.shipdata.stats}/>
        </div>

        <div className="right">
          <SkillZone skills={this.props.shipdata.skills}/>
        </div>
      </div>
    </div>;
  }
}