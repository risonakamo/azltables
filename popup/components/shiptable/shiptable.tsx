import ShipPortrait from "./shipportrait";
import EquipmentBox from "./equipmentbox";
import StatList from "./statlist";
import SkillZone from "./skillzone";

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