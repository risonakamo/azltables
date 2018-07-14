//ShipTable(object data)
class ShipTable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.nonScalingStatBox=this.nonScalingStatBox.bind(this);
        this.classBox=this.classBox.bind(this);
    }

    //produce a non scaling statbox with specified title (text that
    //appears on hover), and data name (name of image icon and name in
    //data.stats object)
    nonScalingStatBox(title,dataName)
    {
        if (!dataName)
        {
            dataName=title;
        }

        return React.createElement("div",{className:"statbox",title:title},
            React.createElement("div",{className:"img-holder"},
                React.createElement("img",{src:`/shiptable/icon/${dataName}.png`})
            ),

            React.createElement("div",{className:"text"},this.props.data.stats[dataName])
        );
    }

    //returns the elements making up the classbox part
    classBox()
    {
        var res=[React.createElement("img",{src:`/shiptable/class/${sclass}.png">`})];

        if (this.props.data.class!="DD" && this.props.data.class!="SS" && this.props.data.torpedoAble)
        {
            res.push(React.createElement("img",{src:"/shiptable/class/DD.png"}));
        }

        else if (this.props.data.class=="DD" && this.props.data.antiairDD)
        {
            res.push(React.createElement("img",{src:"/shiptable/class/CL.png"}));
        }

        res.push(React.createElement("div",{className:"label"},this.props.data.class));

        if (this.props.data.remodel)
        {
            res.push(React.createElement("div",{className:"label"},"改"));
        }

        return res;
    }

    //return elements making up skill boxes part
    skillBoxes()
    {
        return this.props.data.skills.map((x,i)=>{
            return React.createElement("div",{className:"skill-box"},
                React.createElement("div",{className:`name ${x.colour}`},x.name),
                React.createElement("div",{className:"description"},x.description)
            );
        });
    }

    render()
    {
        return React.createElement("div",{className:"ship-table"},
            React.createElement("div",{className:"title-box"},
                React.createElement("img",{
                    className:this.props.data.country,
                    src:`/shiptable/country/${this.props.data.country}.png`
                }),

                React.createElement("a",{href:this.props.data.link},this.props.data.name)
            ),

            React.createElement("div",{className:"bottom"},
                React.createElement("div",{className:"left"},
                    React.createElement("div",{className:`portrait-zone ${this.props.data.rarity}`},
                        React.createElement("div",{className:`class-box ${this.props.data.class}`},
                            this.classBox()
                        ),

                        React.createElement("img",{className:"portrait",src:this.props.data.image})
                    ),

                    React.createElement("div",{className:"equip-box"},
                        React.createElement("div",{className:"equip-holder"},
                            React.createElement("img",{className:"centre",
                                src:`/shiptable/equipment/${this.props.data.equipment[0]}.png`}),

                            React.createElement("div",{className:"squish"},
                                React.createElement("div",{className:"equip-title"},"EQUIP"),
                                React.createElement("img",{className:"equipbox-right",
                                    src:`/shiptable/equipment/${this.props.data.equipment[1]}.png`}),
                            ),

                            React.createElement("img",{className:"centre squish",
                                src:`/shiptable/equipment/${this.props.data.equipment[2]}.png`})
                        )
                    )
                ),

                React.createElement("div",{className:"right-right"},
                    React.createElement("div",{className:"title-bar"},"STAT"),

                    React.createElement("div",{className:"stat-list"},
                        [["hp","hp"],["gun","gun"],["torpedo","torp"],["dodge","dodge"],
                            ["planes","plane"],["antiair","aa"]].map((x,i)=>{
                                return React.createElement(
                                    "div",
                                    {
                                        className:`statbox ${this.props.data.scaling[x[0]]}`,
                                        title:`${x[0]} ${this.props.data.scaling[x[0]]}`,
                                        key:i
                                    },

                                    React.createElement("div",{className:"img-holder"},
                                        React.createElement("div",{className:`scalestat ${x[1]}`})
                                    ),

                                    React.createElement("div",{className:"text"},`${this.props.data.stats[x[0]]}`)
                                );
                        }),

                        ["reload","speed","gas"].map((x,i)=>{
                            return this.nonScalingSkillBox(x);
                        }),

                        (()=>{
                            var subboxes=[];
                            if (this.props.data.class=="SS")
                            {
                                subboxes=[["anti sub","asw"]];
                            }

                            else
                            {
                                subboxes=[["oxygen","oxy"],["ammo","ammo"]];
                            }

                            return subboxes.map((x)=>{
                                return this.nonScalingStatBox(x);
                            });
                        })(),

                        this.nonScalingStatBox("armour")
                    )
                ),

                React.createElement("div",{className:"right"},
                    React.createElement("div",{className:"skill-zone"},
                        this.skillBoxes()
                    )
                )
            )
        );
    }
}