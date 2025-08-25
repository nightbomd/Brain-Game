const shapes = [
    { value: "rectangle", src: "https://codehs.com/uploads/80297cbc97fb545c295c9ba2b4c9a169" },
    { value: "triangle", src: "https://codehs.com/uploads/8a69636def6051e11e45f2b4e095ce46" },
    { value: "circle", src: "https://codehs.com/uploads/f4d2c32539cd55d580bba74bedc0d375" },
    { value: "star", src: "https://codehs.com/uploads/7f55a415a5e03f3f4ae4f14d7f58b740" },
    { value: "asterick", src: "https://codehs.com/uploads/7da10019c507aee2aeb3e47976caaecc" },
    { value: "boomerang", src: "https://codehs.com/uploads/afd6a63f61d069631811a54157e3afd9" },
    { value: "traingle-down", src: "https://codehs.com/uploads/1c210a8279eaff5b45b7e0aeebe3552f" }
];
const imgContainer = document.querySelector(".img-container");
const icon = document.querySelector(".icon");
const validation = document.querySelector(".handle-validation");
let currentShape = null;
let previousShape = null;
const correctCounter = document.querySelector(".counter");

// timer


function timer () {
    let seconds = 5;
    let minutes = 0;
    let gameOver = false;
    const timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        if (seconds === 0 && minutes === 0) {
            gameOver = true;
        }
        if (gameOver) {
            document.querySelector(".msg").innerHTML = `<p> <span>Game Over!</span> score: <span>${counter}</span></p><p><span>Refresh</span> to <span>Restart</span></p>`

        }

        let m = minutes.toString().padStart(2, "0");
        let s = seconds.toString().padStart(2, "0"); // <-- FIXED

        const timerElem = document.querySelector(".time");
        timerElem.innerHTML = `${m}:${s}`;
    }, 1000);
}


function getRandomShape() {
    const randomShape = Math.floor(Math.random() * shapes.length);
    return shapes[randomShape];
}
function getNextShape(previousShape) {
    const shouldRepeat = Math.random() < 0.5; // 50% chance same/different

    if (shouldRepeat && previousShape) {
        return previousShape;
    }

    // Otherwise, pick a different shape
    let newShape;
    do {
        newShape = getRandomShape();
    } while (previousShape && newShape.value === previousShape.value);

    return newShape;
}

    let gameStart = false;
document.addEventListener("keydown", (event) => {

    if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
      
        if (!gameStart) {
            gameStart = true;
            timer()
        }

        handleValidation(event);

         previousShape = currentShape;
        currentShape = getNextShape(previousShape);

        setTimeout(() => {
            icon.innerHTML = `<img class="shape" src="${currentShape.src}">`;
        }, 300);

        // Reset the animation
        icon.style.animation = "none";           // clear it
        void icon.offsetWidth;                   // trigger reflow (this is the magic trick)
        icon.style.animation = "fadeLeft 0.3s ease-in";  // re-apply

        
    }
});

let counter = 0;
let streak = 0;
const streakElm = document.querySelector(".streak");
function handleValidation(event) {
  
    let isCorrect = null;
    validation.style.animation = "none";
    void validation.offsetWidth;
    validation.style.animation = "appear 1.5s linear";


    if (!previousShape || !currentShape) {
        validation.innerHTML = `<img src = "https://codehs.com/uploads/5d24784a3e210d4ee8ba97c214446c78">`;
        return;
    }

    if (currentShape.value !== previousShape.value) {
        if (event.code === "Enter") {
            isCorrect = true;
        }
        else if (event.code === "Space") {
            isCorrect = false;
        }

    }
    else if (currentShape.value === previousShape.value) {
        if (event.code === "Space") {
            isCorrect = true;
        }
        else if (event.code === "Enter") {
            isCorrect = false;
        }
    }
    if (isCorrect) {
        validation.innerHTML = `<img src = "https://codehs.com/uploads/8b403bdc7d5370dcf836cc457887097b">`;
        counter++;
        correctCounter.innerHTML = counter;
    }
    else if (!isCorrect) {
        validation.innerHTML = `<img src = "https://codehs.com/uploads/56bdcd72726d3a17f43fa63a68d25387">`
    }
   
}
