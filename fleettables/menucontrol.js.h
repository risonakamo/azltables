class _menucontroller
{
    _menucontroller();

    element-array buttons; //main menu buttons and also the textbox
    element-array buttonsText; //text of main menu buttons
    element fleetList;

    element shiptableContainer; //actual element containing shiptables
    element-array shiptables; //array of all shiptables

    object currentFleet
    {
        element fleetElement;
        object fleetObj;
    };

    int deleteMode;
    int clearMode;
    int fleetCreate;
    int fleetLoad;
    int fleetEdit;

    void initMenu();
    void initShipEvents();
    void initFleetMenu();

    void toggleButtonHide(array hideButtons);
    void toggleFleetCreate();
    void toggleLoadedFleetMode(object data);
    void toggleFleetEdit();

    void addFleet();

    element genFleetEntry(object data);
}