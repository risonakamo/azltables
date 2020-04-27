type ShipClass="CL"|"CA"|"CV"|"CVL"|"BB"|"DD"|"AR"|"BM"|"BC"|"SS"|"BBV";
type ShipCountry="cn"|"de"|"en"|"fr"|"jp"|"missing"|"nep"|"ru"|"us"|"uta"|"vfr";
type ShipRarity="gold"|"purple"|"blue"|"grey";

type SkillColour="blue"|"red"|"yellow";

interface ShipInfo
{
    name:string
    class:ShipClass
    country:ShipCountry
    rarity:ShipRarity

    equipment:number[]
    skills:ShipSkill[]
    stats:ShipStats
    torpedoAble:boolean

    image:string
    link:string
}

interface ShipSkill
{
    name:string
    description:string
    colour:SkillColour
}

interface ShipStats
{
    antiair:number
    armour:string
    asw:number
    dodge:number
    gas:number
    gun:number
    hp:number
    luck:number
    planes:number
    reload:number
    speed:number
    torpedo:number
}