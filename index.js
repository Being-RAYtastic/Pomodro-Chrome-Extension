const timerDisplay = document.getElementById('timer')
const actionTimerButton = document.getElementById('actionTimerBtn')
const resetButton = document.getElementById('resetTimerBtn')
const settingsButton = document.getElementById('settingsBtn')
const saveFocusBtn = document.getElementById('saveFocusBtn')


const timeOverAudio = document.getElementById("timeOver")
timeOverAudio.volume = 0


let timerCount = 0

let breakTimerCount = 0
let timerIsRunning = false

let mode = "focus"

const defaultTimerCount = 1500

if (timerCount === 0) {
    timerCount = defaultTimerCount
    timerDisplay.textContent = formatTime(timerCount)
}
loadFocusTime()

// Function to format time in HH:MM:SS or MM:SS format
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    } else {

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
}

// Start the timer
function startTimer() {
    timerIsRunning = true

    if (timerIsRunning) settingsButton.classList.add('hidden')

    const timer = setInterval(() => {

        if (timerCount > 0 && timerIsRunning) {
            timerCount--
            // console.log(timerCount)
            timerDisplay.textContent = formatTime(timerCount)
        }
        else {
            timerIsRunning = false
            clearInterval(timer)
            // alert('Time is up!')
            actionTimerButton.classList.remove('fa-pause')
            actionTimerButton.classList.add('fa-play')

            settingsButton.classList.remove('hidden')

            if (timerCount === 0) {
                timeOverAudio.play()

                switchMode()
                settingsButton.classList.remove('hidden')
            }
        }
    }, 1000)

}


// Pause the timer
function pauseTimer() {
    timerIsRunning = false
    clearInterval(timerCount)
    settingsButton.classList.remove('hidden')

}

// START/PAUSE button event listener
actionTimerButton.addEventListener('click', () => {
    if (!timerIsRunning) {
        startTimer()
        actionTimerButton.classList.remove('fa-play')
        actionTimerButton.classList.add('fa-pause')

    } else {
        pauseTimer()
        actionTimerButton.classList.remove('fa-pause')
        actionTimerButton.classList.add('fa-play')
    }

})

// Reset button event listener
resetButton.addEventListener('click', () => {
    timerIsRunning = false
    clearInterval(timer)
    actionTimerButton.classList.remove('fa-pause')
    actionTimerButton.classList.add('fa-play')
    loadFocusTime()
})

// Settings button event listener
settingsButton.addEventListener('click', () => {
    const settingsMenu = document.getElementById('settingsMenu')
    settingsMenu.classList.toggle('hidden')
})

// Save button event listener (to save focus time settings)
saveFocusBtn.addEventListener('click', () => {
    const focusHoursInput = document.getElementById('focusHours').value || 0
    const focusMinutesInput = document.getElementById('focusMinutes').value || 0
    const focusSecondsInput = document.getElementById('focusSeconds').value || 0


    const totalSeconds = (parseInt(focusHoursInput) * 3600) + (parseInt(focusMinutesInput) * 60) + parseInt(focusSecondsInput)

    if (totalSeconds > 0) localStorage.setItem("focusTime", JSON.stringify(totalSeconds));
    else if (totalSeconds === 0) localStorage.setItem("focusTime", JSON.stringify(defaultTimerCount));

    loadFocusTime()

})

saveBreakBtn.addEventListener('click', () => {
    const breakHoursInput = document.getElementById('breakHours').value || 0
    const breakMinutesInput = document.getElementById('breakMinutes').value || 0
    const breakSecondsInput = document.getElementById('breakSeconds').value || 0

    const totalSeconds = (parseInt(breakHoursInput) * 3600) + (parseInt(breakMinutesInput) * 60) + parseInt(breakSecondsInput)

    if (totalSeconds > 0) localStorage.setItem("breakTime", JSON.stringify(totalSeconds));
    else if (totalSeconds === 0) localStorage.setItem("breakTime", JSON.stringify(defaultTimerCount));

    // loadBreakTime()
})

function loadBreakTime() {
    const storedBreakTime = localStorage.getItem("breakTime");
    if (storedBreakTime) {
        timerCount = JSON.parse(storedBreakTime);
        timerDisplay.textContent = formatTime(timerCount);
    }
}

// load focus time from localStorage on calling the function
function loadFocusTime() {
    const storedFocusTime = localStorage.getItem("focusTime");
    if (storedFocusTime) {
        timerCount = JSON.parse(storedFocusTime);
        timerDisplay.textContent = formatTime(timerCount);
    }
}

function switchMode(manualSelection) {


    if (manualSelection === undefined) {

        if (mode === "focus") {
            mode = "break"
            loadBreakTime()
        } else if (mode === "break") {
            mode = "focus"
            loadFocusTime()
        }
    }
    // else if (manualSelection === "focus") {
    //     mode = "focus"
    //     loadFocusTime()
    // } else if (manualSelection === "break") {
    //     mode = "break"
    //     loadBreakTime()
    // }
}


const focusSettingsMenuBtn = document.getElementById('focusSettingsMenuBtn')
const breakSettingsMenuBtn = document.getElementById('breakSettingsMenuBtn')

focusSettingsMenuBtn.addEventListener('click', () => {
    focusSettingsMenuBtn.classList.add('active')
    breakSettingsMenuBtn.classList.remove('active')

    document.querySelector('.focusSettings').classList.remove('hidden')
    document.querySelector('.breakSettings').classList.add('hidden')
})

breakSettingsMenuBtn.addEventListener('click', () => {
    breakSettingsMenuBtn.classList.add('active')
    focusSettingsMenuBtn.classList.remove('active')

    document.querySelector('.breakSettings').classList.remove('hidden')
    document.querySelector('.focusSettings').classList.add('hidden')
})