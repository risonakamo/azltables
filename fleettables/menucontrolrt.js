//MenuControl(object fleets)
//fleets: user fleets
class MenuControl extends React.Component
{
    render()
    {
        return [
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
            ),

            ReactDOM.createPortal(
                this.props.fleets.map((x,i)=>{
                    return React.createElement("div",{className:"fleet-entry",key:`fleetlist${i}`},
                        React.createElement("div",{className:"inline-contain"},
                            React.createElement("div",{className:"overflow-contain all-filter"},
                                "ALL"
                            )
                        )
                    );
                }),
                document.querySelector(".fleet-list")
            )
        ];
    }
}