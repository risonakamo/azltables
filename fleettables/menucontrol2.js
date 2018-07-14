//MenuControl(object fleets)
//fleets: user fleets
class MenuControl extends React.Component
{
    constructor(props)
    {
        super(props);

        console.log(this.props.fleets);
    }

    render()
    {
        return [
            React.createElement("div",{className:"fleet-list",key:"menutop1"},
                this.props.fleets.map((x,i)=>{
                    return React.createElement(FleetList,{fleet:x,key:`fleet${i}`});
                }),

                React.createElement("div",{className:"fleet-entry",key:"fleetlistall"},
                    React.createElement("div",{className:"inline-contain"},
                        React.createElement("div",{className:"overflow-contain all-filter"},
                            "ALL"
                        )
                    )
                )
            ),

            React.createElement("div",{className:"menu-operations",key:"menutop2"},
                ["remove ship","clear all","create fleet"].map((x,i)=>{
                    return React.createElement("div",{className:"button menu-item",key:i},
                        React.createElement("div",{className:"gradientback not-selected"}),
                        React.createElement("div",{className:"gradientback selected"}),
                        React.createElement("div",{className:"gradientback focus"}),
                        React.createElement("span",null,x)
                    );
                }),

                React.createElement("div",{className:"button menu-item hidden",key:4},
                    React.createElement("div",{className:"gradientback not-selected"}),
                    React.createElement("div",{className:"gradientback selected"}),
                    React.createElement("div",{className:"gradientback complete"}),
                    React.createElement("div",{className:"gradientback focus"}),
                    React.createElement("span",null,"set fleet name")
                ),

                React.createElement(
                    "input",
                    {
                        className:"menu-input menu-item hidden",
                        type:"text",
                        placeholder:"fleet title",
                        key:5
                    }
                )
            )
        ];
    }
}

//FleetList(object fleet)
//fleet: single fleet object
class FleetList extends React.Component
{
    render()
    {
        return React.createElement("div",{className:"fleet-entry"},
            React.createElement("div",{className:"inline-contain"},
                React.createElement("div",{className:"overflow-contain"},
                    (()=>{
                        var res=[];

                        for (var x=0,l=_shipClasses.length;x<l;x++)
                        {
                            if (!this.props.fleet.classes[_shipClasses[x]])
                            {
                                continue;
                            }

                            for (var y=0,ly=this.props.fleet.classes[_shipClasses[x]];y<ly;y++)
                            {
                                res.push(React.createElement("img",{className:_shipClasses[x],
                                    src:`/shiptable/class/${_shipClasses[x]}.png`,key:`${x},${y}`}));
                            }
                        }

                        return res;
                    })()
                ),

                React.createElement("span",{className:"label"},this.props.fleet.name)
            )
        );
    }
}