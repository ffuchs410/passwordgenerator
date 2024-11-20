// Hole den Schieberegler und das Eingabefeld für die Passwortlänge
const slider = document.getElementById("length-slider");
const inputField = document.getElementById("length");

// Synchronisiere den Slider-Wert mit dem Eingabefeld
slider.addEventListener("input", function () {
    inputField.value = slider.value;
});

// Generiere Passwort basierend auf dem Slider-Wert
document.getElementById("generate-btn").addEventListener("click", function () {
    const length = parseInt(slider.value); // Passwortlänge aus dem Slider
    const useUppercase = document.getElementById("uppercase").checked; // Checkbox für Großbuchstaben
    const useNumbers = document.getElementById("numbers").checked; // Checkbox für Zahlen
    const useSymbols = document.getElementById("symbols").checked; // Checkbox für Sonderzeichen

    const password = generatePassword(length, useUppercase, useNumbers, useSymbols); // Passwort generieren
    document.getElementById("output").value = password; // Zeige das generierte Passwort an

    // Stärke des Passworts bewerten (falls implementiert)
    evaluatePasswordStrength(password);
});

// Funktion: Passwort generieren
function generatePassword(length, useUppercase, useNumbers, useSymbols) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?";
    let charset = lowercase;

    if (useUppercase) charset += uppercase; // Füge Großbuchstaben hinzu
    if (useNumbers) charset += numbers; // Füge Zahlen hinzu
    if (useSymbols) charset += symbols; // Füge Sonderzeichen hinzu

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

// Funktion: Passwortstärke bewerten (falls implementiert)
function evaluatePasswordStrength(password) {
    let strength = 0;

    // Passwortkriterien bewerten
    if (password.length >= 8) strength++; // Länge
    if (/[A-Z]/.test(password)) strength++; // Großbuchstaben
    if (/[0-9]/.test(password)) strength++; // Zahlen
    if (/[\W_]/.test(password)) strength++; // Sonderzeichen

    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text").querySelector("span");

    // Stärke anpassen
    if (strength === 0) {
        strengthBar.style.width = "0%";
        strengthBar.style.backgroundColor = "red";
        strengthText.textContent = "Unbewertet";
    } else if (strength === 1) {
        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "red";
        strengthText.textContent = "Schwach";
    } else if (strength === 2) {
        strengthBar.style.width = "66%";
        strengthBar.style.backgroundColor = "yellow";
        strengthText.textContent = "Mittel";
    } else if (strength === 3) {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "green";
        strengthText.textContent = "Stark";
    } else if (strenght === 4) {
        strengthBar.style.width = "133%";
        strengthBar.style.bachkgroundColor = "pink";
        strengthText.textContent = "Extrem stark!!!"
    }
}
