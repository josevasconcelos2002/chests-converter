const CYCLE_POINTS = 870;


// Rewards obtained from 1 complete cycle
const CYCLE_REWARDS = {
    common: 0,
    rare: 40,
    epic: 12,
    legendary: 3,
    mythic: 1
};


// Current cycle information
let currentCycles = 0;


// Global Mythic counter
let totalMythicChests = 0;


// Prevent counting the same calculation twice
let cycleAlreadyCounted = false;


/* =========================
   CALCULATE
========================= */

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


    /* =========================
       VALIDATE INPUTS
    ========================= */

    for (let field of fields) {

        const input =
            document.getElementById(field);

        const val =
            Number(input.value);

        const max =
            Number(input.max);


        // ❌ Invalid / negative
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


        // 🚫 Exceeds maximum
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


    /* =========================
       CALCULATE CHEST POINTS
    ========================= */

    const totalPoints =
        values.common * 1 +
        values.rare * 2 +
        values.epic * 8 +
        values.legendary * 32 +
        values.mythic * 120;


    /* =========================
       CALCULATE COMPLETE CYCLES
    ========================= */

    const mythicChests =
        Math.floor(
            totalPoints / CYCLE_POINTS
        );


    /* =========================
       CALCULATE REMAINING POINTS
    ========================= */

    const remainingPoints =
        totalPoints % CYCLE_POINTS;


    // Store current cycle result
    currentCycles = mythicChests;


    /* =========================
       UPDATE GLOBAL MYTHIC COUNTER
    ========================= */

    if (!cycleAlreadyCounted) {

        totalMythicChests += mythicChests;

        cycleAlreadyCounted = true;
    }


    /* =========================
       SHOW CURRENT RESULTS
    ========================= */

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


    /* =========================
       UPDATE GLOBAL COUNTER
    ========================= */

    document.getElementById("totalMythic").textContent =
        totalMythicChests;
}


/* =========================
   NEXT CYCLE
========================= */

function nextCycle() {

    if (currentCycles <= 0) {

        alert(
            "⚠️ There are no complete cycles to convert."
        );

        return;
    }


    /* =========================
       CALCULATE REWARDS
    ========================= */

    const commonChests =
        CYCLE_REWARDS.common *
        currentCycles;

    const rareChests =
        CYCLE_REWARDS.rare *
        currentCycles;

    const epicChests =
        CYCLE_REWARDS.epic *
        currentCycles;

    const legendaryChests =
        CYCLE_REWARDS.legendary *
        currentCycles;

    const mythicChests =
        CYCLE_REWARDS.mythic *
        currentCycles;


    /* =========================
       UPDATE INPUTS
    ========================= */

    document.getElementById("common").value =
        commonChests;

    document.getElementById("rare").value =
        rareChests;

    document.getElementById("epic").value =
        epicChests;

    document.getElementById("legendary").value =
        legendaryChests;

    document.getElementById("mythic").value =
        mythicChests;


    /* =========================
       PREPARE NEW CYCLE
    ========================= */

    cycleAlreadyCounted = false;


    /* =========================
       RESET CURRENT CYCLE
    ========================= */

    currentCycles = 0;


    /* =========================
       HIDE RESULTS
    ========================= */

    document.getElementById("result").style.display =
        "none";


    /* =========================
       GLOBAL COUNTER STAYS VISIBLE
    ========================= */

    document.getElementById("totalMythic").textContent =
        totalMythicChests;
}


/* =========================
   THEME
========================= */

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


/* =========================
   LOAD SAVED THEME
========================= */

window.onload = function () {

    const savedTheme =
        localStorage.getItem("theme") ||
        "light";


    applyTheme(savedTheme);


    // Make sure global counter starts at 0
    document.getElementById("totalMythic").textContent =
        totalMythicChests;
};