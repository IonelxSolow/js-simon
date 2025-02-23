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
            const value = Number(input.value);
            if (value >= 1 && value <= 50) {
                userAnswers.push(value);
            }
        }

      
        const correctOccurrences = {};
        for (let number of correctNumbers) {
            correctOccurrences[number] = (correctOccurrences[number] || 0) + 1;
        }

       
        const userOccurrences = {};
        for (let number of userAnswers) {
            userOccurrences[number] = (userOccurrences[number] || 0) + 1;
        }

      
        const correctGuesses = [];
        for (let number in userOccurrences) {
            if (correctOccurrences[number]) {
               
                const minOccurrences = Math.min(userOccurrences[number], correctOccurrences[number]);
                for (let i = 0; i < minOccurrences; i++) {
                    correctGuesses.push(Number(number));
                }
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