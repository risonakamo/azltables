class _menucontroller
{
    constructor()
    {
        var doc=document;

        this.buttons=doc.querySelectorAll(".menu-operations .menu-item");
        this.buttonsText=[];

        this.shiptableContainer=doc.querySelector(".ftables");

        this.shiptables=this.shiptableContainer.querySelectorAll(".ship-table");

        this.deleteMode=0;
        this.clearMode=0;
        this.fleetCreate=0;

        this.initMenu();
        this.initShipEvents();
    }

    initMenu()
    {
        //remove ship button
        this.buttonsText.push(this.buttons[0].querySelector("span"));
        this.buttons[0].addEventListener("click",(e)=>{
            if (this.clearMode)
            {
                this.clearMode=0;
                this.buttonsText[0].innerText="remove ship";
                this.buttonsText[1].innerText="clear all";
                this.toggleButtonHide([2,3]);
                return;
            }

            if (!this.deleteMode)
            {
                this.deleteMode=1;
                this.shiptableContainer.classList.add("delete-mode");
                this.buttonsText[0].innerText="end remove";
                this.toggleButtonHide([1,2,3]);
            }

            else
            {
                this.deleteMode=0;
                this.shiptableContainer.classList.remove("delete-mode");
                this.buttonsText[0].innerText="remove ship";
                this.toggleButtonHide([1,2,3]);
            }
        });

        this.buttonsText.push(this.buttons[1].querySelector("span"));
        this.buttons[1].addEventListener("click",(e)=>{
            if (this.fleetCreate)
            {
                this.fleetCreate=0;
                this.buttonsText[1].innerText="clear all";
                this.toggleButtonHide([4,0,3]);
                return;
            }

            if (!this.clearMode)
            {
                this.clearMode=1;
                this.buttonsText[0].innerText="cancel clear";
                this.buttonsText[1].innerText="confirm clear all!!!!!!!!!";
                this.toggleButtonHide([2,3]);
            }

            else
            {
                this.clearMode=0;
                this.buttonsText[0].innerText="remove ship";
                this.buttonsText[1].innerText="clear all";
                this.shiptableContainer.innerHTML="";
                this.toggleButtonHide([2,3]);
                chrome.storage.local.remove(_shipClasses);
            }
        });

        this.buttonsText.push(this.buttons[2].querySelector("span"));
        this.buttons[2].addEventListener("click",(e)=>{
            if (!this.fleetCreate)
            {
                this.fleetCreate=1;
                this.buttonsText[1].innerText="cancel create fleet";
                this.toggleButtonHide([4,0,3]);
            }

            else
            {


                this.fleetCreate=0;
                this.buttonsText[1].innerText="clear all";
                this.toggleButtonHide([4,0,3]);
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

    toggleButtonHide(hideButtons)
    {
        for (var x=0;x<hideButtons.length;x++)
        {
            this.buttons[hideButtons[x]].classList.toggle("hidden");
        }
    }
}