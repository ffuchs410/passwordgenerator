function generatePassword(length, useUppercase, useNumbers, useSymbols) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@$%&*()_+-=[]{}|;:',.<>?";
    let charset = lowercase;

    if (useUppercase) charset += uppercase;
    if (useNumbers) charset += numbers;
    if (useSymbols) charset += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

document.getElementById("generate-btn").addEventListener("click", function() {
    const length = parseInt(document.getElementById("length").value);
    const useUppercase = document.getElementById("uppercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    const password = generatePassword(length, useUppercase, useNumbers, useSymbols);
    document.getElementById("output").value = password;
});

document.getElementById("copy-btn").addEventListener("click", async function () {
    const passwordField = document.getElementById("output");
    if (passwordField.value) {
        try {
            // Passwort in die Zwischenablage kopieren
            await navigator.clipboard.writeText(passwordField.value);
            alert("Passwort wurde erfolgreich kopiert!");
        } catch (err) {
            alert("Fehler beim Kopieren: " + err);
        }
    } else {
        alert("Kein Passwort zum Kopieren vorhanden!");
    }
});

function evaluatePasswordStrength(password) {
    let strength = 0;

    // Passwortkriterien bewerten
    if (password.length >= 8) strength++; // Länge
    if (/[A-Z]/.test(password)) strength++; // Großbuchstaben
    if (/[0-9]/.test(password)) strength++; // Zahlen
    if (/[\W_]/.test(password)) strength++; // Sonderzeichen

    // Stärke und Balken anpassen
    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text").querySelector("span");

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
    } else if (strength >= 3) {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "green";
        strengthText.textContent = "Stark";
    }
}

// Event-Listener erweitern
document.getElementById("generate-btn").addEventListener("click", function () {
    const length = parseInt(document.getElementById("length").value);
    const useUppercase = document.getElementById("uppercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    const password = generatePassword(length, useUppercase, useNumbers, useSymbols);
    document.getElementById("output").value = password;

    // Stärke des Passworts bewerten
    evaluatePasswordStrength(password);
});

