import "./statlist.less";

// ship stats to display
const statsNames:(keyof ShipStats)[]=["hp","gun","torpedo","dodge","planes","antiair",
  "reload","speed","gas","asw","armour"];

interface StatListProps
{
  stats:ShipStats
}

/* StatList(ShipStats stats) */
export default class StatList extends React.Component
{
  props:StatListProps

  render()
  {
    return <div className="stat-list">
      {_.map(statsNames,(x:keyof ShipStats)=>{
        return <StatBox statname={x} value={this.props.stats[x]} key={x}/>;
      })}
    </div>;
  }
}

interface StatBoxProps
{
  statname:keyof ShipStats
  value:string|number
}

/* StatBox(string statname, string|number value) */
class StatBox extends React.Component
{
  props:StatBoxProps

  render()
  {
    return <div className="stat-box">
      <div className="img-holder fit-divs">
        <img src={getStatImg(this.props.statname)}/>
      </div>
      <div className="text fit-divs">{this.props.value}</div>
    </div>;
  }
}

// given a stat name from ShipStats, return an image url
function getStatImg(stat:keyof ShipStats):string
{
  var imgname:string=stat;
  switch (stat)
  {
    case "antiair":
    imgname="aa";
    break;

    case "planes":
    imgname="plane";
    break;

    case "torpedo":
    imgname="torp";
    break;
  }

  return `../imgs/shiptable/staticons/${imgname}.png`;
}