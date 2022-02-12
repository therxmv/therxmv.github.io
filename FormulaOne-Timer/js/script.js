const calendar = {
    "Bahrain": new Date(2022, 2, 18),
    "Saudi_Arabia": new Date(2022, 2, 25),
    "Australia": new Date(2022, 3, 8),
    "Italy-Romagna": new Date(2022, 3, 22),
    "USA-Miami": new Date(2022, 4, 6),
    "Spain": new Date(2022, 4, 20),
    "Monaco": new Date(2022, 4, 27),
    "Azerbaijan": new Date(2022, 5, 10),
    "Canada": new Date(2022, 5, 17),
    "Great_Britain": new Date(2022, 6, 1),
    "Austria": new Date(2022, 6, 8),
    "France": new Date(2022, 6, 22),
    "Hungary": new Date(2022, 6, 29),
    "Belgium": new Date(2022, 7, 26),
    "Netherlands": new Date(2022, 8, 2),
    "Italy-Monza": new Date(2022, 8, 9),
    "Russia": new Date(2022, 8, 23),
    "Singapore": new Date(2022, 8, 30),
    "Japan": new Date(2022, 9, 7),
    "USA": new Date(2022, 9, 21),
    "Mexico": new Date(2022, 9, 28),
    "Brazil": new Date(2022, 10, 11),
    "Abu_Dhabi": new Date(2022, 10, 18)
}

const d = document.querySelector('#days'),
    h = document.querySelector('#hours'),
    m = document.querySelector('#min'),
    s = document.querySelector('#sec'),
    timer = setInterval(updateTimer, 1000);
let remainTime, days, hours, minutes, seconds,
    i = 0;

function updateTimer() {
    getRemainingTime();

    d.textContent = addZero(days);
    h.textContent = addZero(hours);
    m.textContent = addZero(minutes);
    s.textContent = addZero(seconds);
}

function getRemainingTime() {
    const deadline = Object.values(calendar)[i];

    remainTime = Date.parse(deadline) - Date.parse(new Date());
    if(remainTime == 0){
        i++;
        if(i == Object.keys(calendar).length){
            i = 0;
        }
    }

    days = Math.floor(remainTime / (1000 * 60 * 60 * 24));
    hours = Math.floor((remainTime / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((remainTime / (1000 * 60)) % 60);
    seconds = Math.floor((remainTime / 1000) % 60);
}

// Add zero like: 8 -> 08
function addZero(num) {
    if(num < 10){
        return `0${num}`;
    }
    else {
        return num;
    }
}