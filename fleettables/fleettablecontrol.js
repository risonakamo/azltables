//FleetTable(object ships,shipClasses)
//ships: user ships object list thing, keyd by class
//shipClasses: array of shipClasses in order they should appear
class FleetTable extends React.Component
{
    render()
    {
        return (()=>{
            var res=[];

            var currentClass;
            var skey=0;
            for (var x=0,l=this.props.shipClasses.length;x<l;x++)
            {
                currentClass=this.props.shipClasses[x];
                if (!this.props.ships[currentClass])
                {
                    continue;
                }

                for (var y=0,ly=this.props.ships[currentClass].length;y<ly;y++)
                {
                    skey++;
                    res.push(React.createElement(ShipTable,{data:this.props.ships[currentClass][y],key:skey}));
                }
            }

            return res;
        })();
    }
}