import "./skillzone.less";

/* SkillZone(ShipSkill[] skills) */
export default class SkillZone extends React.Component
{
  props:{
    skills:ShipSkill[]
  }

  render()
  {
    return <div className="skill-zone">
      {_.map(this.props.skills,(x:ShipSkill,i:number)=>{
        return <SkillBox skill={x} key={i}/>;
      })}
    </div>;
  }
}

/* SkillBox(ShipSkill skill) */
class SkillBox extends React.Component
{
  props:{
    skill:ShipSkill
  }

  render()
  {
    return <div className="skill-box">
      <div className={`name ${this.props.skill.colour}`}>{this.props.skill.name}</div>
      <div className="description">
        {this.props.skill.description}
      </div>
    </div>;
  }
}