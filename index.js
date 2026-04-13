const timerDisplay = document.getElementById('timer')
const actionTimerButton = document.getElementById('actionTimerBtn')
const resetButton = document.getElementById('resetTimerBtn')
const settingsButton = document.getElementById('settingsBtn')
const saveBtn = document.getElementById('saveBtn')


// let timerCount = 10
let timerIsRunning = false
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
                loadFocusTime()
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
actionTimerButton.addEventListener('click', ()=> {
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
saveBtn.addEventListener('click', () => {
    const hoursInput = document.getElementById('hours').value || 0
    const minutesInput = document.getElementById('minutes').value || 0
    const secondsInput = document.getElementById('seconds').value || 0


    const totalSeconds = (parseInt(hoursInput) * 3600) + (parseInt(minutesInput) * 60) + parseInt(secondsInput)

    localStorage.setItem("focusTime", JSON.stringify(totalSeconds));
    loadFocusTime()

})

// load focus time from localStorage on calling the function
function loadFocusTime() {
    const storedFocusTime = localStorage.getItem("focusTime");
    if (storedFocusTime) {
        timerCount = JSON.parse(storedFocusTime);
        timerDisplay.textContent = formatTime(timerCount);
    }
}
