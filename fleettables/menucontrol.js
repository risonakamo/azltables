class _menucontroller
{
    constructor()
    {
        this.buttons=document.querySelectorAll(".menu-operations .button");
        this.shiptables=document.querySelectorAll(".ship-table");

        console.log(this.shiptables);
        this.initButtons();
    }

    initButtons()
    {
        this.buttons[0].addEventListener("click",(e)=>{

        });
    }
}