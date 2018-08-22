robocopy fleettables build\fleettables /xd fleetentry-gen h
robocopy icons build\icons
robocopy popup build\popup
robocopy shiptable build\shiptable /s /xd shiptable-gen
robocopy . build /xf build.bat localstorage.gql readme.md