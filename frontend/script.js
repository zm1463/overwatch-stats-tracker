// Selectors
const playerOneForm = document.querySelector("#player-one .battletag-input-form");
const playerOneInput = document.querySelector("#first-battletag-search");
const playerOneTitle = document.querySelector("#player-one h2");
const playerTwoForm = document.querySelector("#player-two .battletag-input-form");
const playerTwoInput = document.querySelector("#second-battletag-search");
const playerTwoTitle = document.querySelector("#player-two h2");


playerOneForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    /*
        This includes a lot of checks of the inputted string, as Overwatch has
        a lot of different requirements for how battletags can look. This is all
        required to prevent unnecesssary lookups in the backend 
    */
    const firstBattleTag = playerOneInput.value;
    if (!firstBattleTag.includes("#") || (firstBattleTag.includes(" ")) || (firstBattleTag.trim() == "")) {
        playerOneTitle.textContent = "Improper Input (Requires #, No Spaces Allowed, Empty string)";
        return;
    }

    //TODO: implement check to see how many splits there are to avoid multiple hashtags

    const firstUsernameOnly = firstBattleTag.split("#")[0];
    const firstNumbers = firstBattleTag.split("#")[1];
    //TODO: make sure "Firstnumbers" actually only has numbers

    //TODO: figure out what special characters are allowed and implement those checks as well

    //TODO: make this code neater, use boolean variables and potentially split up some of the if statements
    
    if (((firstNumbers.length >= 3) && (firstNumbers.length <= 6)) && ((firstUsernameOnly.length >= 3) && (firstUsernameOnly.length <= 15))) {
        playerOneTitle.textContent = firstUsernameOnly; 
        playerOneInput.value = ""; //clear input box
    } else {
        playerOneTitle.textContent = "Improper Amount of Numbers in ID";
    }
});

playerTwoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const secondBattleTag = playerTwoInput.value;
    if (!secondBattleTag.includes("#")) {
        playerTwoTitle.textContent = "Improper input (requires #)";
        return;
    }

    let secondUsernameOnly = secondBattleTag.split("#")[0];
    if (secondUsernameOnly.trim() !== "") {
        playerTwoTitle.textContent = secondUsernameOnly;
        playerTwoInput.value = "";
    }
});