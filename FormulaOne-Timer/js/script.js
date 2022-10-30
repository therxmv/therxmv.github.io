//--API--//
class F1Service {
    getInfo = async () => {
        const res = await fetch(`http://ergast.com/api/f1/2022.json`, {method: 'GET', redirect: 'follow'});
        return await res.json();
    }

    getAllRaces = async () => {
        const races = await this.getInfo();
        return {
            races: races.MRData.RaceTable.Races
        }
    }
}
//--API--//

async function main() {
    const f1 = new F1Service();

    const d = document.querySelector('#days'),
        h = document.querySelector('#hours'),
        m = document.querySelector('#min'),
        s = document.querySelector('#sec'),
        gpName = document.querySelector('#racename'),
        {races} = await f1.getAllRaces(),
        currentRaceId = getCurrentRace();
    
    // set timer values
    async function updateTimer() {
        const {days, hours, minutes, seconds, raceName} = getData();

        // remove shimmer animation
        document.querySelectorAll('.shimmerBG').forEach(elem => {
            elem.classList.remove('shimmerBG');
        })

        d.textContent = days;
        h.textContent = hours;
        m.textContent = minutes;
        s.textContent = seconds;
        gpName.textContent = raceName;
    }

    const timer = setInterval(updateTimer, 1000);

    // returns id of current race
    function getCurrentRace() {
        for(let i = 0; i < races.length + 1; i++) {
            // check if season ends
            if(i == races.length) {
                return -1;
            }

            // get gp start time
            const {date, time} = races[i],
                deadline = new Date(`${date}T${time}`);

            if(Date.parse(deadline) > Date.parse(new Date())) {
                return i;
            }
        }
    }
    
    // returns remaining days, hours, ..., raceName to gp start
    function getData() {
        if(currentRaceId == -1) {
            clearInterval(timer);

            return {
                days: "00",
                hours: "00",
                minutes: "00",
                seconds: "00",
                raceName: `The end of season`,
            }
        }

        const {date, time, raceName} = races[currentRaceId],
            deadline = new Date(`${date}T${time}`),
            remainTime = Date.parse(deadline) - Date.parse(new Date());

        return {
            days: addZero(Math.floor(remainTime / (1000 * 60 * 60 * 24))),
            hours: addZero(Math.floor((remainTime / (1000 * 60 * 60)) % 24)),
            minutes: addZero(Math.floor((remainTime / (1000 * 60)) % 60)),
            seconds: addZero(Math.floor((remainTime / 1000) % 60)),
            raceName: `To ${raceName} remain`,
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
}

main();