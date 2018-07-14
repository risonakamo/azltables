//FleetTable(object ships)
//ships: user ships object list thing
class FleetTable extends React.Component
{
    render()
    {
        return this.props.ships.map((x,i)=>{
            return React.createElement(ShipTable,{data:x,key:i});
        });
    }
}