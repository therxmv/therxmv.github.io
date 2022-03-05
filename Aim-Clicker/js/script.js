const start = document.querySelector('.start-btn'),
    end = document.querySelector('.end-btn'),
    circle = document.querySelector('.aim-circle'),

    counterWrap = document.querySelector('.counter'),
    counter = counterWrap.querySelector('span'),
    
    highScoreWrap = document.querySelector('.high-score'),
    highScore = highScoreWrap.querySelector('span'),

    avgTimeWrap = document.querySelector('.avg-time'),
    avgTime = avgTimeWrap.querySelector('span'),

    delay = 700;

let time = 0,
    avgTimeArr = [],
    avgTimeRes = 0;

start.addEventListener('click', () => {
    start.classList.add('hide');
    counterWrap.classList.remove('hide');
    end.classList.remove('hide');

    const interval = setInterval(() => {circleSpawn()}, delay);

    end.addEventListener('click', () => {
        clearInterval(interval);

        end.classList.add('hide');
        circle.classList.add('hide');
        start.classList.remove('hide');
        counterWrap.classList.add('hide');

        if(parseInt(counter.textContent) > parseInt(highScore.textContent)){
            highScore.textContent = parseInt(counter.textContent);
        }
        counter.textContent = 0;

        setAvgTime();
    });
});

circle.addEventListener('click', () => {
    counter.textContent = parseInt(counter.textContent) + 1;

    // collect reaction times
    avgTimeArr.push((new Date() - time) / 1000);
});

highScoreWrap.addEventListener('click', () => {
    highScoreWrap.classList.add('hide');
    avgTimeWrap.classList.remove('hide');
});

avgTimeWrap.addEventListener('click', () => {
    avgTimeWrap.classList.add('hide');
    highScoreWrap.classList.remove('hide');
});

// calculate average reaction time
function setAvgTime() {
    avgTimeArr.forEach(elem => {
        avgTimeRes += elem;
    });
    avgTimeRes = (avgTimeRes / avgTimeArr.length).toFixed(3);

    if(avgTimeRes < parseFloat(avgTime.textContent) || parseFloat(avgTime.textContent) == 0 || avgTime.textContent === 'NaN'){
        avgTime.textContent = avgTimeRes;
    }
    avgTimeArr = [];
    avgTimeRes = 0;
}

// show random circle
function circleSpawn() {
    circle.classList.remove('hide');
    time = new Date();

    let wh = Math.floor(Math.random() * (70 - 30) + 30);
    
    circle.style.width = wh + 'px';
    circle.style.height = wh + 'px';
    circle.style.bottom = Math.floor(Math.random() * 92) + '%';
    circle.style.right = Math.floor(Math.random() * 85) + '%';
}