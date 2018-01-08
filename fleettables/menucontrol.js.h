class _menucontroller
{
    _menucontroller();

    element-array buttons; //main menu buttons
    element-array buttonsText; //text of main menu buttons
    element-array shiptables;

    element shiptableContainer;

    int deleteMode;
    int clearMode;

    void initButtons();
    void initShipEvents();
}