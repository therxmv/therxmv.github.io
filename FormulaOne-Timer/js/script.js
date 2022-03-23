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
            raceName: dt.MRData.RaceTable.Races[0].raceName,
        }
    }
}
//--API--//

const f1 = new F1Service();

const d = document.querySelector('#days'),
    h = document.querySelector('#hours'),
    m = document.querySelector('#min'),
    s = document.querySelector('#sec'),
    gpName = document.querySelector('#racename'),
    //--START TIMER--//
    timer = setInterval(updateTimer, 1000);

let remainTime, id = 1;

async function updateTimer() {
    const {days, hours, minutes, seconds, raceName} = await getRemainingTime();

    if(seconds > 0) {
        document.querySelectorAll('.shimmerBG').forEach(elem => {
            elem.classList.remove('shimmerBG');
        })

        d.textContent = addZero(days);
        h.textContent = addZero(hours);
        m.textContent = addZero(minutes);
        s.textContent = addZero(seconds);
        gpName.textContent = `To ${raceName} remain`;
    }
}

async function getRemainingTime() {
    if(id > 22){
        id = 1;
    }

    const {date, time, raceName} = await f1.getDT(id);
    const deadline = new Date(`${date}T${time}`);

    remainTime = Date.parse(deadline) - Date.parse(new Date());

    if(remainTime <= 0){
        id++;
    }

    return {
        days: Math.floor(remainTime / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remainTime / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((remainTime / (1000 * 60)) % 60),
        seconds: Math.floor((remainTime / 1000) % 60),
        raceName: raceName,
    }
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
