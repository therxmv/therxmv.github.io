getAllSchedule = async () => {
    const res = await fetch(`https://www.formula1.com/en/racing/${new Date().getFullYear()}.html`, { 
        method: "GET", 
        mode: 'cors', 
        headers: {
            host: 'www.formula1.com',
            accept: '*/*',
        },
    });
    return await res.text();
};

getRaceInfo = async (url) => {
    const res = await fetch(url, { method: "GET", mode: 'cors'});
    return await res.text();
};

async function main() {
    const scheduleText = await getAllSchedule();


    const parser = new DOMParser();
    const hrefs = parser.parseFromString(scheduleText, "text/html").getElementsByClassName("event-item-wrapper");

    for(elem of hrefs) {
        const raceInfo = await getRaceInfo(elem);
        const raceEvents = parser.parseFromString(raceInfo, "text/html").getElementsByClassName("f1-race-hub--timetable-listings");
        raceEvents[0].classList.add(elem.match(RegExp(/[^\/]+.\w+$/gm))[0].replace(".html", ""));
        document.body.appendChild(raceEvents[0]);
    }
}

main();