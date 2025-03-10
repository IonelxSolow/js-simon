document.addEventListener("DOMContentLoaded", () => {
    const countDownEl = document.getElementById("countdown");
    const instructionsEl = document.getElementById("instructions");
    const numbersListEl = document.getElementById("numbers-list");
    const answersFormEl = document.getElementById("answers-form");
    const inputGroupEl = document.getElementById("input-group");
    const messageEl = document.getElementById("message");

    // funzione per generare numeri casuali
    const numbersToRemember = generateRandomNumbers(5, 1, 50);
    function generateRandomNumbers(quantity, min, max) {
        const numbers = [];
        for (let i = 0; i < quantity; i++) {
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            } while (numbers.includes(randomNumber));
            numbers.push(randomNumber);
        }
        return numbers;
    }
    console.log(numbersToRemember);

    // funzione per visualizzare i numeri
    function displayNumbers(numbers) {
        numbersListEl.innerHTML = "";
        for (let number of numbers) {
            const li = document.createElement("li");
            li.textContent = number;
            numbersListEl.appendChild(li);
        }
    }
    displayNumbers(numbersToRemember);

    // avvia countdown
    let countDown = 30;
    const countDownInterval = setInterval(() => {
        countDown--;
        countDownEl.textContent = countDown;
        if (countDown === 0) {
            clearInterval(countDownInterval);
            hideNumbersAndShowForm();
        }
    }, 100);

    // nascondi i numeri e mostra il form
    function hideNumbersAndShowForm() {
        numbersListEl.classList.add("d-none");
        instructionsEl.classList.add("d-none");
        answersFormEl.classList.remove("d-none");

        answersFormEl.addEventListener("submit", function (e) {
            e.preventDefault();
            checkAnswers(numbersToRemember);
        });
    }

    // funzione per verificare le risposte 
    function checkAnswers(correctNumbers) {
        const userAnswers = [];
        const inputs = inputGroupEl.querySelectorAll("input");

        
        for (let input of inputs) {
            const value = input.value.trim(); 
            if (value !== "") { 
                userAnswers.push(Number(value)); 
            }
        }

        // confronta i numeri inseriti con quelli corretti
        const correctGuesses = [];
        for (let number of userAnswers) {
            if (correctNumbers.includes(number)) {
                correctGuesses.push(number);
            }
        }

        // mostra i numeri indovinati e manda un messaggio in pagina
        if (correctGuesses.length > 0) {
            messageEl.textContent = `Hai indovinato ${correctGuesses.length} numeri: ${correctGuesses.join(", ")}`;
        } else {
            messageEl.textContent = "Non hai indovinato nessun numero.";
        }
        
    }
});