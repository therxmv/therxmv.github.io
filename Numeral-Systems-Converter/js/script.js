const input = document.querySelector('input'),
    numbers = document.querySelectorAll('.num'),
    reg = /\d+/;

input.addEventListener('input', (e) => {
    e.target.value = e.target.value.match(reg);
    for(let i = 2; i <= 9; i++){
        converter(e.target.value, i);
    }
});

function converter(number, system){
    let num = [],
        temp = number;

    while(temp / system > 0){
        num.unshift(temp % system);
        temp = Math.floor(temp / system);
    }

    numbers[system-2].innerHTML = num.join('');
}