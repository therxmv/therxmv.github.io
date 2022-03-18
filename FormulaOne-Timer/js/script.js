//--API--//
class F1Service {
    getInfo = async (id) => {
        const res = await fetch(`http://ergast.com/api/f1/2022/${id}.json`, {method: 'GET', redirect: 'follow'});
        return await res.json();
    }

    getDT = async (id) => {
        const dt = await this.getInfo(id);
        return {
            date: dt.MRData.RaceTable.Races[0].date,
            time: dt.MRData.RaceTable.Races[0].time,
        }
    }
}
//--API--//

const f1 = new F1Service();

const d = document.querySelector('#days'),
    h = document.querySelector('#hours'),
    m = document.querySelector('#min'),
    s = document.querySelector('#sec'),
    //--START TIMER--//
    timer = setInterval(updateTimer, 1000);

let remainTime, days, hours, minutes, seconds,
    id = 1;

function updateTimer() {
    getRemainingTime();

    d.textContent = addZero(days);
    h.textContent = addZero(hours);
    m.textContent = addZero(minutes);
    s.textContent = addZero(seconds);
}

async function getRemainingTime() {
    const {date, time} = await f1.getDT(id);

    const deadline = new Date(`${date}T${time}`);

    remainTime = Date.parse(deadline) - Date.parse(new Date());
    if(remainTime <= 0){
        id++;
        if(id > 22){
            id = 1;
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
