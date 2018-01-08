class _menucontroller
{
    constructor()
    {
        this.buttons=document.querySelectorAll(".menu-operations .button");
        this.shiptableContainer=document.querySelector(".ftables");
        this.shiptables=this.shiptableContainer.querySelectorAll(".ship-table");

        this.deleteMode=0;

        this.initButtons();
        this.initShipEvents();
    }

    initButtons()
    {
        //remove ship button
        var buttonText=this.buttons[0].querySelector("span");
        this.buttons[0].addEventListener("click",(e)=>{
            if (!this.deleteMode)
            {
                this.deleteMode=1;
                this.shiptableContainer.classList.add("delete-mode");
                buttonText.innerText="end remove";
            }

            else
            {
                this.deleteMode=0;
                this.shiptableContainer.classList.remove("delete-mode");
                buttonText.innerText="remove";
            }
        });
    }

    initShipEvents()
    {
        for (var x=0,l=this.shiptables.length;x<l;x++)
        {
            this.shiptables[x].addEventListener("click",(e)=>{
                if (this.deleteMode)
                {
                    var name=e.currentTarget.children[0].children[1].innerText;

                    var deleteClass=e.currentTarget.querySelector(".class-box .label").innerText;
                    chrome.storage.local.get(deleteClass,(d)=>{
                        var data=d[deleteClass];

                        for (var x=0,l=data.length;x<l;x++)
                        {
                            if (data[x].name==name)
                            {
                                data.splice(x,1);
                                break;
                            }
                        }

                        d[deleteClass]=data;
                        chrome.storage.local.set(d);
                    });

                    this.shiptableContainer.removeChild(e.currentTarget);
                }
            });
        }
    }
}