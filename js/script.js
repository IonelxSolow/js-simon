document.addEventListener("DOMContentLoaded", () => {

    const countDownEl = document.getElementById("countdown");
    const instructionsEl = document.getElementById("instruction");
    const numbersListEl = document.getElementById("numbers-list");
    const answersFormEl = document.getElementById("answers-form");
    const inputGroupEl = document.getElementById("input-group");
    const messageEl = document.getElementById("message")


    // funzione per generare numeri casuali
    const numbersToRemember = generateRandomNumbes(5, 1, 50)
    function generateRandomNumbes(quantity, min, max) {
        const numbers = [];
        for (let i = 0; i < quantity; i++) {
            let randomNumber;
            do { //esegue il ciclo finche la condizione e vera 
                randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            } while (numbers.includes(randomNumber));
            numbers.push(randomNumber)

    }return numbers
    }
console.log(numbersToRemember)
displayNumbers(numbersToRemember);


// funzione per visualizzare i numeri 
function displayNumbers(numbers){
    numbersListEl.innerHTML="";
    for(let number of numbers) {
        const li = document.createElement("li");
        li.textContent = number;
        numbersListEl.appendChild(li);
    }
}






})