// calculator in typescript
var display = document.getElementById("display");
var scientificSection = document.getElementById("scientific-section");
var scienceBtn = document.getElementById("science");
var scientificVisible = false;
function toggleScientific() {
    scientificVisible = !scientificVisible;
    if (scientificVisible) {
        scientificSection.style.display = "block";
        scienceBtn.style.backgroundColor = "hsl(120, 100%, 30%)"; // Green when active
    }
    else {
        scientificSection.style.display = "none";
        scienceBtn.style.backgroundColor = "hsl(35, 100%, 50%)"; // Orange when inactive
    }
}
function appendToDisplay(input) {
    display.value += input;
}
function clearDisplay() {
    display.value = "";
}
function clearPrevious() {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
    }
}
function calculate() {
    try {
        // Enhanced sanitizer for scientific functions
        var sanitized = display.value.replace(/[^0-9+\-*/().MathPIEsincostanlog%]/g, '');
        // Replace math functions and constants
        var expression = sanitized
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/Math\.PI/g, Math.PI.toString())
            .replace(/Math\.E/g, Math.E.toString())
            .replace(/%/g, '/100');
        var result = new Function('return ' + expression)();
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid calculation");
        }
        display.value = result.toString();
    }
    catch (error) {
        display.value = "Error";
    }
}
