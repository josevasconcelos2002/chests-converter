const CYCLE_POINTS = 870;

// Reward sequence for one complete 870-point cycle.
// The number is the Chest Points required to obtain that reward.
const REWARD_SEQUENCE = [
    { type: "rare", cost: 10 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 10 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "legendary", cost: 60 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "epic", cost: 20 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "legendary", cost: 60 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "legendary", cost: 60 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "rare", cost: 10 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 20 },
    { type: "rare", cost: 20 },
    { type: "epic", cost: 20 },
    { type: "rare", cost: 20 },
    { type: "mythic", cost: 20 },
    { type: "rare", cost: 10 }
];

let currentCycles = 0;

let totalMythicChests = 0;

let cycleAlreadyCounted = false;


// Calculate rewards obtained from the beginning
// of the reward sequence using the remaining points.
function calculateRemainingRewards(points) {

    const rewards = {
        common: 0,
        rare: 0,
        epic: 0,
        legendary: 0,
        mythic: 0
    };

    let pointsLeft = points;

    for (const reward of REWARD_SEQUENCE) {

        if (pointsLeft < reward.cost) {
            break;
        }

        rewards[reward.type]++;
        pointsLeft -= reward.cost;
    }

    return {
        rewards: rewards,
        pointsLeft: pointsLeft
    };
}


function calculate() {

    const fields = [
        "common",
        "rare",
        "epic",
        "legendary",
        "mythic"
    ];

    const resultBox =
        document.getElementById("result");

    const values = {};

    for (let field of fields) {

        const input =
            document.getElementById(field);

        const val =
            Number(input.value);

        const max =
            Number(input.max);

        if (isNaN(val) || val < 0) {

            resultBox.style.display = "block";

            resultBox.innerHTML = `
                <h2>Results</h2>
                <p style="color:red; font-weight:bold;">
                    ⚠️ Invalid input in:
                    <strong>${field}</strong>
                    <br>
                    🚫 Negative numbers are not allowed.
                </p>
            `;

            return;
        }

        if (val > max) {

            resultBox.style.display = "block";

            resultBox.innerHTML = `
                <h2>Results</h2>
                <p style="color:red; font-weight:bold;">
                    ⚠️ Value too high in:
                    <strong>${field}</strong>
                    <br>
                    🚫 Maximum allowed is ${max}.
                </p>
            `;

            return;
        }

        values[field] = val;
    }


    // Convert opened chests into Chest Points
    const totalPoints =
        values.common * 1 +
        values.rare * 2 +
        values.epic * 8 +
        values.legendary * 32 +
        values.mythic * 120;


    // Complete 870-point cycles
    const mythicChests =
        Math.floor(totalPoints / CYCLE_POINTS);


    // Points left after complete cycles
    const remainingPoints =
        totalPoints % CYCLE_POINTS;


    currentCycles = mythicChests;


    // Store the remaining points so Next Cycle
    // can use them even when there are 0 complete cycles.
    window.currentRemainingPoints = remainingPoints;


    // Count complete cycles only once
    if (!cycleAlreadyCounted) {

        totalMythicChests += mythicChests;

        cycleAlreadyCounted = true;
    }


    resultBox.style.display = "block";

    resultBox.innerHTML = `
        <h2>Results</h2>

        <p>
            🎯 <strong>Total Chest Points:</strong>
            ${totalPoints}
        </p>

        <p>
            🏆 <strong>Mythic Chests Earned:</strong>
            ${mythicChests}
        </p>

        <p>
            📦 <strong>Remaining Points:</strong>
            ${remainingPoints}
        </p>
    `;


    document.getElementById("totalMythic").textContent =
        totalMythicChests;
}


function nextCycle() {

    const remainingPoints =
        window.currentRemainingPoints || 0;


    // Nothing can be obtained
    if (currentCycles <= 0 && remainingPoints < 10) {

        alert(
            "⚠️ There are not enough Chest Points to obtain a reward."
        );

        return;
    }


    // Rewards from complete cycles
    let rewards = {
        common: 0,
        rare: 0,
        epic: 0,
        legendary: 0,
        mythic: 0
    };


    // Complete cycles give the entire reward sequence
    for (let i = 0; i < currentCycles; i++) {

        for (const reward of REWARD_SEQUENCE) {

            rewards[reward.type]++;
        }
    }


    // Add rewards obtainable from remaining points
    let pointsLeft = remainingPoints;

    for (const reward of REWARD_SEQUENCE) {

        if (pointsLeft < reward.cost) {
            break;
        }

        rewards[reward.type]++;
        pointsLeft -= reward.cost;
    }


    // Put all rewards into the input fields
    document.getElementById("common").value =
        rewards.common;

    document.getElementById("rare").value =
        rewards.rare;

    document.getElementById("epic").value =
        rewards.epic;

    document.getElementById("legendary").value =
        rewards.legendary;

    document.getElementById("mythic").value =
        rewards.mythic;


    // Reset current calculation
    currentCycles = 0;
    window.currentRemainingPoints = 0;
    cycleAlreadyCounted = false;


    // Hide results
    document.getElementById("result").style.display =
        "none";


    // Keep global counter visible
    document.getElementById("totalMythic").textContent =
        totalMythicChests;
}


function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");
    }


    const select =
        document.getElementById("themeSelect");

    if (select) {
        select.value = theme;
    }
}


function changeTheme() {

    const theme =
        document.getElementById("themeSelect").value;


    applyTheme(theme);


    localStorage.setItem(
        "theme",
        theme
    );
}


window.onload = function () {

    const savedTheme =
        localStorage.getItem("theme") ||
        "light";


    applyTheme(savedTheme);


    document.getElementById("totalMythic").textContent =
        totalMythicChests;
};