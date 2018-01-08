class _menucontroller
{
    constructor()
    {
        this.buttons=document.querySelectorAll(".menu-operations .button");
        this.shiptables=document.querySelectorAll(".ship-table");

        this.deleteMode=0;

        this.initButtons();
        this.initShipEvents();
    }

    initButtons()
    {
        this.buttons[0].addEventListener("click",(e)=>{

        });
    }

    initShipEvents()
    {
        for (var x=0,l=this.shiptables.length;x<l;x++)
        {
            this.shiptables[x].addEventListener("click",(e)=>{
                console.log("a");
            });
        }
    }
}