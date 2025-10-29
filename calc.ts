// calculator in typescript
const display = document.getElementById("display") as HTMLInputElement;
const scientificSection = document.getElementById("scientific-section") as HTMLDivElement;
const scienceBtn = document.getElementById("science") as HTMLButtonElement;

let scientificVisible = false;

function toggleScientific(): void {
    scientificVisible = !scientificVisible;
    
    if (scientificVisible) {
        scientificSection.style.display = "block";
        scienceBtn.style.backgroundColor = "hsl(120, 100%, 30%)"; // Green when active
    } else {
        scientificSection.style.display = "none";
        scienceBtn.style.backgroundColor = "hsl(35, 100%, 50%)"; // Orange when inactive
    }
}

function appendToDisplay(input: string): void {
    display.value += input;
}

function clearDisplay(): void {
    display.value = "";
}

function clearPrevious(): void {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
    }
}

function calculate(): void {
    try {
        // Enhanced sanitizer for scientific functions
        const sanitized = display.value.replace(/[^0-9+\-*/().MathPIEsincostanlog%]/g, '');
        
        // Replace math functions and constants
        let expression = sanitized
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/Math\.PI/g, Math.PI.toString())
            .replace(/Math\.E/g, Math.E.toString())
            .replace(/%/g, '/100');
        
        const result = new Function('return ' + expression)();
        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid calculation");
        }
        
        display.value = result.toString();
    } catch (error) {
        display.value = "Error";
    }
}