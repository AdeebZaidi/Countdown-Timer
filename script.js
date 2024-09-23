const startButton = document.getElementById('start');
const endTimeInput = document.getElementById('endtime');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const progressBar = document.querySelector('.progress');

let countdownInterval;

function startCountdown() {
    const userInput = endTimeInput.value.trim();
    let endTime;

    if (userInput.includes('s') || userInput.includes('m') || userInput.includes('h') || userInput.includes('d')) {
        const now = new Date().getTime();
        if (userInput.includes('s')) {
            const seconds = parseInt(userInput.replace('s', ''), 10);
            endTime = now + seconds * 1000;
        } else if (userInput.includes('m')) {
            const minutes = parseInt(userInput.replace('m', ''), 10);
            endTime = now + minutes * 60 * 1000;
        } else if (userInput.includes('h')) {
            const hours = parseInt(userInput.replace('h', ''), 10);
            endTime = now + hours * 60 * 60 * 1000;
        } else if (userInput.includes('d')) {
            const days = parseInt(userInput.replace('d', ''), 10);
            endTime = now + days * 24 * 60 * 60 * 1000;
        }
    } else {
        endTime = new Date(userInput).getTime();
    }

    const totalDuration = endTime - new Date().getTime();

    if (isNaN(endTime)) {
        alert('Please enter a valid date, time, or duration.');
        return;
    }

    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            progressBar.style.width = '100%';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;

        const progress = (1 - distance / totalDuration) * 100;
        progressBar.style.width = progress + '%';
    }, 1000);
}

startButton.addEventListener('click', startCountdown);

// Trigger countdown on pressing "Enter" key
endTimeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startCountdown();
    }
});
