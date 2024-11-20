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
    const length = parseInt(document.getElementById("lenght").value);
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

