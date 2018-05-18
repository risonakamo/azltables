class _menucontroller
{
    constructor()
    {
        var doc=document;
        this.triggerZone=doc.querySelector(".trigger-zone");

        this.buttons=this.triggerZone.querySelectorAll(".menu-operations .menu-item");
        this.buttonsText=[];

        this.shiptableContainer=doc.querySelector(".ftables");

        this.shiptables=this.shiptableContainer.querySelectorAll(".ship-table");

        this.fleetList=this.triggerZone.querySelector(".fleet-list");

        this.currentFleet={};

        this.deleteMode=0;
        this.clearMode=0;
        this.fleetCreate=0;
        this.fleetLoad=0;
        this.fleetEdit=0;

        this.initMenu();
        this.initShipEvents();
    }

    //events of menu
    initMenu()
    {
        //remove ship button
        this.buttonsText.push(this.buttons[0].querySelector("span"));
        this.buttons[0].addEventListener("click",(e)=>{
            if (this.fleetEdit)
            {
                this.toggleFleetEdit();
                return;
            }

            if (this.fleetLoad)
            {
                this.toggleLoadedFleetMode(0);
                return;
            }

            if (this.clearMode)
            {
                this.clearMode=0;
                this.buttonsText[0].innerText="remove ship";
                this.buttonsText[1].innerText="clear all";
                this.toggleButtonHide([2]);
                this.triggerZone.classList.toggle("show");
                return;
            }

            if (!this.deleteMode)
            {
                this.deleteMode=1;
                this.shiptableContainer.classList.add("delete-mode");
                this.buttonsText[0].innerText="end remove";
                this.toggleButtonHide([1,2]);
                this.triggerZone.classList.toggle("show");
            }

            else
            {
                this.deleteMode=0;
                this.shiptableContainer.classList.remove("delete-mode");
                this.buttonsText[0].innerText="remove ship";
                this.toggleButtonHide([1,2]);
                this.triggerZone.classList.toggle("show");
            }
        });

        //clear all button
        this.buttonsText.push(this.buttons[1].querySelector("span"));
        this.buttons[1].addEventListener("click",(e)=>{
            if (this.fleetLoad)
            {
                this.fleetList.removeChild(this.currentFleet.fleetElement);

                for (var x=0,l=_fleets.length;x<l;x++)
                {
                    if (_fleets[x].id==this.currentFleet.fleetObj.id)
                    {
                        _fleets.splice(x,1);
                        break;
                    }
                }

                chrome.storage.local.set({fleets:_fleets});

                this.toggleLoadedFleetMode(0);
                return;
            }

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
                this.toggleButtonHide([2]);
                this.triggerZone.classList.toggle("show");
            }

            else
            {
                this.clearMode=0;
                this.buttonsText[0].innerText="remove ship";
                this.buttonsText[1].innerText="clear all";
                this.shiptableContainer.innerHTML="";
                this.toggleButtonHide([2]);
                this.triggerZone.classList.toggle("show");
                chrome.storage.local.remove(_shipClasses);
            }
        });

        //fleet create button
        this.buttonsText.push(this.buttons[2].querySelector("span"));
        this.buttons[2].addEventListener("click",(e)=>{
            if (this.fleetLoad)
            {
                this.toggleFleetEdit();
                return;
            }

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

        //fleet rename button
        this.buttonsText.push(this.buttons[3].querySelector("span"));
        this.buttons[3].addEventListener("click",(e)=>{
            this.currentFleet.fleetObj.name=this.buttons[4].value;
            this.currentFleet.fleetElement.firstChild.lastChild.innerText=this.buttons[4].value;

            this.buttons[3].classList.add("complete");

            chrome.storage.local.set({fleets:_fleets});

            setTimeout(()=>{
                this.buttons[3].classList.remove("complete");
            },2000);
        });

        this.triggerZone.querySelector(".all-filter").addEventListener("click",(e)=>{
            if (this.fleetLoad && !this.fleetEdit)
            {
                this.toggleLoadedFleetMode(0);
            }

            filterShips(0);
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

                else if (this.fleetCreate || this.fleetEdit)
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
            this.fleetList.insertAdjacentElement("afterbegin",this.genFleetEntry(_fleets[x]));
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
            this.toggleButtonHide([4,0]);
            this.triggerZone.classList.toggle("show");
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

            this.toggleButtonHide([4,0]);
            this.triggerZone.classList.toggle("show");
        }
    }

    //using hopefully set data, create a fleet and add it to database, and local
    //copy of fleets _fleets
    addFleet()
    {
        var selected=this.shiptableContainer.querySelectorAll(".selected");
        var res={
            ships:[],
            classes:{},
            name:this.buttons[4].value,
            id:_fleetsId+1
        };

        _fleetsId++;

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
        chrome.storage.local.set({fleets:_fleets,fleetsId:_fleetsId});

        this.fleetList.insertAdjacentElement("afterbegin",this.genFleetEntry(res));
    }

    genFleetEntry(data)
    {
        var res=document.createElement("div");
        res.classList.add("fleet-entry");

        var shipsString=this.genShipString(data.classes);

        res.innerHTML=`<div class="inline-contain"><div class="overflow-contain">${shipsString}</div><span class="label">${data.name}</span></div>`;

        res.firstChild.firstChild.addEventListener("click",(e)=>{
            if (!(this.deleteMode || this.clearMode || this.fleetCreate || this.fleetEdit))
            {
                this.currentFleet.fleetElement=res;
                this.currentFleet.fleetObj=data;
                this.buttons[4].value=data.name;
            }

            this.toggleLoadedFleetMode(data.ships);
        });

        return res;
    }

    //give it classes object with count of classes
    genShipString(classes)
    {
        var shipsString="";
        for (var x in classes)
        {
            for (var y=0;y<classes[x];y++)
            {
                shipsString+=`<img class="${x}" src="/shiptable/class/${x}.png">`;
            }
        }

        return shipsString;
    }

    //give it an array of ships to enter fleet loaded mode, or 0 to exit.
    //if already in another mode, it will filter only
    toggleLoadedFleetMode(data)
    {
        //exit fleet loaded mode
        if (!(data instanceof Array))
        {
            this.fleetLoad=0;
            filterShips([]);

            this.buttonsText[0].innerText="remove ship";
            this.buttonsText[1].innerText="clear all";
            this.buttonsText[2].innerText="create fleet";
            this.toggleButtonHide([3,4]);
            this.triggerZone.classList.toggle("show");
            return;
        }

        //if any of the other modes are active, fleets simply act as a filter
        if (this.deleteMode || this.clearMode || this.fleetCreate || this.fleetLoad || this.fleetEdit)
        {
            filterShips(data);
            return;
        }

        //enter fleetloaded mode
        this.fleetLoad=1;
        filterShips(data);

        this.buttonsText[0].innerText="return";
        this.buttonsText[1].innerText="delete current fleet";
        this.buttonsText[2].innerText="edit fleet members";
        this.toggleButtonHide([3,4]);
        this.triggerZone.classList.toggle("show");
    }

    toggleFleetEdit()
    {
        if (!this.fleetEdit)
        {
            this.fleetEdit=1;
            this.toggleButtonHide([1,2,3,4]);
            this.shiptableContainer.classList.add("select-mode");

            var selected=new Set(this.currentFleet.fleetObj.ships);

            for (var x=0,l=this.shiptables.length;x<l;x++)
            {
                this.shiptables[x].classList.remove("hidden");

                if (selected.has(this.shiptables[x].name))
                {
                    this.shiptables[x].classList.add("selected");
                }

                else
                {
                    this.shiptables[x].classList.remove("selected");
                }
            }
        }

        else
        {
            this.fleetEdit=0;
            this.toggleButtonHide([1,2,3,4]);
            this.shiptableContainer.classList.remove("select-mode");

            var selected=[];
            var classes={};
            for (var x=0,l=this.shiptables.length;x<l;x++)
            {
                if (this.shiptables[x].classList.contains("selected"))
                {
                    this.shiptables[x].classList.remove("hidden");
                    selected.push(this.shiptables[x].name);

                    if (classes[this.shiptables[x].class])
                    {
                        classes[this.shiptables[x].class]++;
                    }

                    else
                    {
                        classes[this.shiptables[x].class]=1;
                    }
                }

                else
                {
                    this.shiptables[x].classList.add("hidden");
                }
            }

            this.currentFleet.fleetObj.ships=selected;
            this.currentFleet.fleetObj.classes=classes;

            this.currentFleet.fleetElement.firstChild.firstChild.innerHTML=this.genShipString(classes);

            chrome.storage.local.set({fleets:_fleets});
        }
    }
}