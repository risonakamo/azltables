class _menucontroller
{
    _menucontroller();

    element-array buttons; //main menu buttons and also the textbox
    element-array buttonsText; //text of main menu buttons

    element shiptableContainer; //actual element containing shiptables
    element-array shiptables; //array of all shiptables

    int deleteMode;
    int clearMode;
    int fleetCreate;

    void initMenu();
    void initShipEvents();

    void toggleButtonHide(array hideButtons);
    void toggleFleetCreate();

    void addFleet();
}