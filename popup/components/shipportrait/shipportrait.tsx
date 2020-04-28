import "./shipportrait.less";

/* ShipPortrait(string img, string shipclass) */
export default class ShipPortrait extends React.Component
{
  props:{
    img:string
    shipclass:string
  }

  render()
  {
    return <div className="portrait-zone purple">
      <ClassBox shipclass={this.props.shipclass}/>
      <img className="portrait" src={this.props.img}/>
    </div>;
  }
}

/* ClassBox(string shipclass)*/
class ClassBox extends React.Component
{
  props:{
    shipclass:string
  }

  render()
  {
    return <div className={`class-box ${this.props.shipclass}`}>
      <img src={`/imgs/shiptable/class/${this.props.shipclass}.png`}/>
      <div className="label">{this.props.shipclass.toUpperCase()}</div>
    </div>;
  }
}