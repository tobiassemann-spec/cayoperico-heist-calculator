const mainTarget = document.getElementById("mainTarget");
const safeCash = document.getElementById("safeCash");
const players = document.getElementById("players");
const playerCut = document.getElementById("playerCut");
const cutValue = document.getElementById("cutValue");

const totalDisplay = document.getElementById("total");
const earningsDisplay = document.getElementById("earnings");
const pavelDisplay = document.getElementById("pavelDisplay");

const bagSpace = document.getElementById("bagSpace");

const cutContainer = document.getElementById("cutContainer");

const lootInputs = document.querySelectorAll(".lootAmount");

// MAIN TARGETS
const targets = {
    "Madrazo Files": 1100000,
    "Tequila": 630000,
    "Ruby Necklace": 700000,
    "Bearer Bonds": 770000,
    "Pink Diamond": 1300000,
    "Panther Statue": 1900000
};

// LOOT VALUES
const lootValues = {
    cash: 81000,
    artwork: 168750,
    weed: 132750,
    cocaine: 200250,
    gold: 330833
};

// LOAD TARGETS
function loadTargets() {
    mainTarget.innerHTML = "";

    for (let t in targets) {
        let opt = document.createElement("option");
        opt.value = targets[t];
        opt.textContent = `${t} - $${targets[t].toLocaleString()}`;
        mainTarget.appendChild(opt);
    }
}
loadTargets();

// CUT TEXT
playerCut.addEventListener("input", () => {
    cutValue.textContent = `${playerCut.value}%`;
});

// ✅ FIXED: PROPER SHOW/HIDE
function updatePlayerUI() {

    const count = Number(players.value);

    if (count === 1) {
        cutContainer.style.display = "none";
    } else {
        cutContainer.style.display = "block";
    }
}

players.addEventListener("change", updatePlayerUI);
updatePlayerUI();

// BAG SYSTEM
let bag = 0;

lootInputs.forEach(input => {
    input.addEventListener("input", () => {

        let total = 0;

        lootInputs.forEach(i => {
            total += Number(i.value || 0) * Number(i.dataset.space);
        });

        bag = total;

        bagSpace.textContent = `${total.toFixed(1)}%`;
        bagSpace.style.color = total > 100 ? "#ff4d4d" : "#00ff99";
    });
});

// CALCULATE
function calculateCayo() {

    if (bag > 100) return;

    const main = Number(mainTarget.value);
    const safe = Number(safeCash.value || 0);

    let secondary = 0;

    lootInputs.forEach(i => {
        const type = i.dataset.type;
        const amount = Number(i.value || 0);

        secondary += amount * (lootValues[type] || 0);
    });

    const total = main + secondary + safe;

    const pavel = total * 0.02;
    const after = total - pavel;

    const playersCount = Number(players.value);

    let result = after;

    // IMPORTANT FIX
    if (playersCount === 1) {
        result = after;
    } else {
        result = after * (playerCut.value / 100);
    }

    totalDisplay.textContent = "$" + total.toLocaleString();
    earningsDisplay.textContent = "$" + Math.round(result).toLocaleString();
    pavelDisplay.textContent = "$" + Math.round(pavel).toLocaleString();
}