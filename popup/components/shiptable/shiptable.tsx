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

class ShipPortrait extends React.Component
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

class EquipmentBox extends React.Component
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

class StatList extends React.Component
{
  render()
  {
    return <div className="stat-list">

    </div>;
  }
}

class SkillZone extends React.Component
{
  render()
  {
    return <div className="skill-zone">
      <SkillBox/>
    </div>;
  }
}

class SkillBox extends React.Component
{
  render()
  {
    return <div className="skill-box">
      <div class="name yellow">Raid Order</div>
      <div class="description">
        25% activation every 20s: For 8 seconds, increases entire fleet's FP by 5% (25%). Does not stack with the same skill.
      </div>
    </div>;
  }
}