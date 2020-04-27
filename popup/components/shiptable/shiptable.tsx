import ShipPortrait from "../shipportrait/shipportrait";
import EquipmentBox from "../equipmentbox/equipmentbox";
import StatList from "../statlist/statlist";
import SkillZone from "../skillzone/skillzone";

import "./shiptable.less";

/* ShipTable() */
export default class ShipTable extends React.Component
{
  render()
  {
    return <div className="ship-table">
      <div className="title-box">
        <img src="/imgs/shiptable/country/jp.png"/>
        <a href="https://azurlane.koumakan.jp/Kasumi">Kasumi</a>
      </div>

      <div className="bottom">
        <div className="left">
          <ShipPortrait/>
          <EquipmentBox/>
        </div>

        <div className="right-right">
          <div class="title-bar">STAT</div>

          <StatList/>
        </div>

        <div className="right">
          <SkillZone/>
        </div>
      </div>
    </div>;
  }
}