robocopy fleettables build\fleettables /xd fleetentry h /xf fleettables.html
robocopy icons build\icons
robocopy popup build\popup
robocopy shiptable build\shiptable /s /xf shiptable.html shiptable-gen.html
robocopy . build /xf build.bat localstorage.gql readme.md