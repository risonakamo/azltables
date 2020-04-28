declare const ReactDOM:any;
declare const chrome:any;
declare const _:any;

declare namespace React
{
    class Component
    {
        constructor(props:any)
        setState:Function
    }

    class PureComponent extends Component
    {

    }

    const createRef:Function
}

declare namespace JSX
{
    interface IntrinsicElements
    {
        [name:string]:any
    }
}

type Tab=any;