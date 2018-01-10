class _menucontroller
{
    _menucontroller();

    element-array buttons; //main menu buttons and also the textbox
    element-array buttonsText; //text of main menu buttons
    element fleetList;

    element shiptableContainer; //actual element containing shiptables
    element-array shiptables; //array of all shiptables

    int deleteMode;
    int clearMode;
    int fleetCreate;
    int fleetLoad;

    void initMenu();
    void initShipEvents();
    void initFleetMenu();

    void toggleButtonHide(array hideButtons);
    void toggleFleetCreate();
    void toggleLoadedFleetMode(object data);

    void addFleet();

    string genFleetEntry(object data);
}