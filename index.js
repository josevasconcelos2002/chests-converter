function getValue(id) {
    const input = document.getElementById(id);
    const value = input.value;

    // empty field → 0
    if (value === "") return 0;

    const num = Number(value);

    // invalid or negative → error
    if (isNaN(num) || num < 0) {
        return { error: true, field: id };
    }

    return num;
}

function calculate() {

    const fields = ["common", "rare", "epic", "legendary", "mythic"];
    const resultBox = document.getElementById("result");

    const values = {};

    for (let field of fields) {
        const val = getValue(field);

        // ❌ error handling
        if (typeof val === "object" && val.error) {
            resultBox.style.display = "block";
            resultBox.innerHTML = `
                <p style="color:red; font-weight:bold;">
                    ⚠️ Invalid input in: <strong>${field}</strong><br>
                    🚫 Negative numbers are not allowed.
                </p>
            `;
            return;
        }

        values[field] = val;
    }

    const totalPoints =
        values.common * 1 +
        values.rare * 2 +
        values.epic * 8 +
        values.legendary * 32 +
        values.mythic * 120;

    const mythicChests = Math.floor(totalPoints / 800);
    const remainingPoints = totalPoints % 800;

    const pointsNeeded =
        remainingPoints === 0 ? 0 : 800 - remainingPoints;

    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <p>🎯 <strong>Total Chest Points:</strong> ${totalPoints}</p>
        <p>🏆 <strong>Mythic Chests Earned:</strong> ${mythicChests}</p>
        <p>📦 <strong>Remaining Points:</strong> ${remainingPoints}</p>
        <p>⭐ <strong>Points Needed for Next Mythic:</strong> ${pointsNeeded}</p>
    `;
}