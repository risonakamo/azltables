class _menucontroller
{
    constructor()
    {
        var doc=document;

        this.buttons=doc.querySelectorAll(".menu-operations .menu-item");
        this.buttonsText=[];

        this.shiptableContainer=doc.querySelector(".ftables");

        this.shiptables=this.shiptableContainer.querySelectorAll(".ship-table");

        this.fleetList=doc.querySelector(".fleet-list");

        this.deleteMode=0;
        this.clearMode=0;
        this.fleetCreate=0;

        this.initMenu();
        this.initShipEvents();
    }

    //events of menu
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

        //clear all button
        this.buttonsText.push(this.buttons[1].querySelector("span"));
        this.buttons[1].addEventListener("click",(e)=>{
            if (this.fleetCreate)
            {
                this.toggleFleetCreate();
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

        //fleet create button
        this.buttonsText.push(this.buttons[2].querySelector("span"));
        this.buttons[2].addEventListener("click",(e)=>{
            if (!this.fleetCreate)
            {
                this.toggleFleetCreate();
            }

            else
            {
                if (this.buttons[4].value=="")
                {
                    this.buttons[4].classList.add("warning");
                    return;
                }

                this.addFleet();

                this.toggleFleetCreate();
            }
        });
    }

    //shipbox events
    initShipEvents()
    {
        for (var x=0,l=this.shiptables.length;x<l;x++)
        {
            this.shiptables[x].addEventListener("click",(e)=>{
                if (this.deleteMode)
                {
                    var name=e.currentTarget.name;
                    var deleteClass=e.currentTarget.class;

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

                else if (this.fleetCreate)
                {
                    var ct=e.currentTarget;
                    ct.classList.toggle("selected");
                }
            });
        }
    }

    //initialise fleets. called by some outside function when fleets are ready
    initFleetMenu()
    {
        for (var x=0,l=_fleets.length;x<l;x++)
        {
            this.fleetList.insertAdjacentHTML("beforeend",this.genFleetEntry(_fleets[x]));
        }
    }

    //give it array of buttons indexes to toggle hidden state on
    toggleButtonHide(hideButtons)
    {
        for (var x=0;x<hideButtons.length;x++)
        {
            this.buttons[hideButtons[x]].classList.toggle("hidden");
        }
    }

    //toggle fleet create mode
    toggleFleetCreate()
    {
        if (!this.fleetCreate)
        {
            this.fleetCreate=1;
            this.buttonsText[1].innerText="cancel create fleet";
            this.shiptableContainer.classList.toggle("select-mode");
            this.buttons[4].classList.remove("warning");
            this.buttons[4].value="";
            this.toggleButtonHide([4,0,3]);
        }

        else
        {
            this.fleetCreate=0;
            this.shiptableContainer.classList.toggle("select-mode");
            this.buttonsText[1].innerText="clear all";

            var selected=this.shiptableContainer.querySelectorAll(".selected");

            for (var x=0,l=selected.length;x<l;x++)
            {
                selected[x].classList.remove("selected");
            }

            this.toggleButtonHide([4,0,3]);
        }
    }

    //using hopefully set data, create a fleet and add it to database, and local
    //copy of fleets _fleets
    addFleet()
    {
        var selected=this.shiptableContainer.querySelectorAll(".selected");
        var res={ships:[],classes:{},name:this.buttons[4].value};

        for (var x=0;x<selected.length;x++)
        {
            res.ships.push(selected[x].name);
            if (res.classes[selected[x].class])
            {
                res.classes[selected[x].class]++;
            }

            else
            {
                res.classes[selected[x].class]=1;
            }
        }

        _fleets.push(res);
        chrome.storage.local.set({fleets:_fleets});

        this.fleetList.insertAdjacentHTML("beforeend",this.genFleetEntry(res));
    }

    genFleetEntry(data)
    {
        var shipsString="";

        for (var x in data.classes)
        {
            for (var y=0;y<data.classes[x];y++)
            {
                shipsString+=`<img class="${x}" src="/shiptable/class/${x}.png">`;
            }
        }

        return `<div class="fleet-entry"><div class="inline-contain"><div class="overflow-contain">${shipsString}</div><span class="label">${data.name}</span></div></div>`;
    }
}