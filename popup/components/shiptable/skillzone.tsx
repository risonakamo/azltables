import "./skillzone.less";

export default class SkillZone extends React.Component
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