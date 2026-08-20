// Selectors
const playerOneForm = document.querySelector("#player-one .battletag-input-form");
const playerOneInput = document.querySelector("#player-one-battletag-search");
const playerOneTitle = document.querySelector("#player-one h2");
const playerTwoForm = document.querySelector("#player-two .battletag-input-form");
const playerTwoInput = document.querySelector("#player-two-battletag-search");
const playerTwoTitle = document.querySelector("#player-two h2");
const playerOneList = document.getElementById("player-one-list");
const playerTwoList = document.getElementById("player-two-list");

function addToPlayerOneList(text) {
    const newListItem = document.createElement("li");
    newListItem.textContent = text;
    playerOneList.appendChild(newListItem);
}

function addToPlayerTwoList(text) {
    const newListItem = document.createElement("li");
    newListItem.textContent = text;
    playerTwoList.appendChild(newListItem);
}

//Overwatch battletags allow for a lot of "not normal characters" so we have to manually check for what can and can't be allowed
function hasSpecialSymbols(str) { //only pass the username into this
    const specialChars = `!@#$%^&*}()_+~+-}{=;\`',./[]<>?:"\\|`;
    return str.split('').some(char => specialChars.includes(char));
}

async function loadPlayerOneData(searchedTag) {
    try {
        const response = await fetch('./mockData.json'); 
    if (!response.ok) {
        throw new Error(`Failed to load file. Status: ${response.status}`);
    }

    const data = await response.json(); 
    const playerMatch = data.players.find(
        (p) => p.battletag === searchedTag
    );
    
    if (playerMatch) {
        playerOneTitle.textContent = playerMatch.battletag.split("#")[0];
        console.log("Player Found:", playerMatch);

    } else {
        playerOneTitle.textContent = "Player Not Found";
        console.log("Player Not Found");
        return;
    }

    //now append to list  
    console.log(playerMatch.endorsementLevel); 
    addToPlayerOneList("Endorsement Level: " + playerMatch.endorsementLevel);
    addToPlayerOneList("Banana: bingy bop");


    } catch (error) {
        console.error("Error Loading Mock Data:", error);
    } 

}
async function loadPlayerTwoData(searchedTag) {
    try {
        const response = await fetch('./mockData.json');
    if (!response.ok) {
        throw new Error(`Failed to load file. Status: ${response.status}`);
    }

    const data = await response.json(); 
    const playerMatch = data.players.find(
        (p) => p.battletag === searchedTag
    );
    
    if (playerMatch) {
        playerTwoTitle.textContent = playerMatch.battletag.split("#")[0];
        console.log("Player Found:", playerMatch);

    } else {
        playerTwoTitle.textContent = "Player Not Found";
        console.log("Player Not Found");
    }

    //now append to list  
    console.log(playerMatch.endorsementLevel); 
    addToPlayerTwoList("Endorsement Level: " + playerMatch.endorsementLevel);
    addToPlayerTwoList("Banana: bingy bop");


    } catch (error) {
        console.error("Error Loading Mock Data:", error);
    } 

}

playerOneForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    /*
        This includes a lot of checks of the inputted string, as Overwatch has
        a lot of different requirements for how battletags can look. This is all
        required to prevent unnecesssary lookups in the backend 
    */
    const playerOneBattleTag = playerOneInput.value;
    if ((!playerOneBattleTag.includes("#")) || (playerOneBattleTag.includes(" ")) || (playerOneBattleTag.trim() == "")) {
        playerOneTitle.textContent = "Improper Input (Requires #, No Spaces Allowed, Empty string)";
        return;
    }

    if (playerOneBattleTag.split('#').length > 2) {
        playerOneTitle.textContent = "Improper Input, Too Many Hashtags";
        return;
    }
    const playerOneUsername = playerOneBattleTag.split("#")[0].trim();
    const playerOneNumbers = playerOneBattleTag.split("#")[1].trim();

    if (hasSpecialSymbols(playerOneUsername)) {
        playerOneTitle.textContent = "Improper Input, No Symbols In Name";
        return;
    }
    for (const char of playerOneNumbers) {
        if (!(char.trim() !== '' && !isNaN(char))) {
            playerOneTitle.textContent = "Improper Input, Only Numbers Allowed After #";
            return;
        }
    }
    


    
    if (((playerOneNumbers.length >= 3) && (playerOneNumbers.length <= 6)) && ((playerOneUsername.length >= 3) && (playerOneUsername.length <= 15))) {
        loadPlayerOneData(playerOneBattleTag);
        playerOneInput.value = "";
    } else {
        playerOneTitle.textContent = "Improper Amount of Numbers in ID";
        return;
    }

});

playerTwoForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    /*
        This includes a lot of checks of the inputted string, as Overwatch has
        a lot of different requirements for how battletags can look. This is all
        required to prevent unnecesssary lookups in the backend 
    */
    const playerTwoBattleTag = playerTwoInput.value;
    if ((!playerTwoBattleTag.includes("#")) || (playerTwoBattleTag.includes(" ")) || (playerTwoBattleTag.trim() == "")) {
        playerTwoTitle.textContent = "Improper Input (Requires #, No Spaces Allowed, Empty string)";
        return;
    }

    if (playerTwoBattleTag.split('#').length > 2) {
        playerTwoTitle.textContent = "Improper Input, Too Many Hashtags";
        return;
    }
    const playerTwoUsername = playerTwoBattleTag.split("#")[0].trim();
    const playerTwoNumbers = playerTwoBattleTag.split("#")[1].trim();

    if (hasSpecialSymbols(playerTwoUsername)) {
        playerTwoTitle.textContent = "Improper Input, No Symbols In Name";
        return;
    }
    for (const char of playerTwoNumbers) {
        if (!(char.trim() !== '' && !isNaN(char))) {
            playerTwoTitle.textContent = "Improper Input, Only Numbers Allowed After #";
            return;
        }
    }
    
    if (((playerTwoNumbers.length >= 3) && (playerTwoNumbers.length <= 6)) && ((playerTwoUsername.length >= 3) && (playerTwoUsername.length <= 15))) {
        loadPlayerTwoData(playerTwoBattleTag);
        playerTwoInput.value = "";
    } else {
        playerTwoTitle.textContent = "Improper Amount of Numbers in ID";
        return;
    }
});