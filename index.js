const audio = new Audio('assets/ringtone.mp3')

const currTime = document.getElementById("curr-time")
const addAlarm = document.querySelector('.set-alarm-form')
const allAlarms = document.querySelector('#all-alarms')

const alarmList = []

audio.loop = true

function ring(){
    audio.play();
    alert('Jaago mohan payaaree')
}

// extract the current time and display it on the web page. 

function currentTime(){
    let date = new Date()
    let h = formatNumber(date.getHours())
    let m = formatNumber(date.getMinutes())
    let s = formatNumber(date.getSeconds())

    let time = `${h}:${m}:${s}`
    currTime.innerText = time

    if(alarmList.includes(time)){

        ring()
    }
}

// function to stop the alarm afterwe click the stop alarm button
function stopAlarm(){
audio.pause()
}

// format number to make sure comparison operator can work as intended.
function formatNumber (number){
    if(number < 10 && number.length != 2 ){
        return '0' + number
    }
    return number
}

// to remove the alarm from the web page after we have removed it from the alarm list array
allAlarms.addEventListener('click', e =>{
    if(e.target.classList.contains("delete-alarm")){
        e.target.parentElement.remove()
    }
})

//to remove the alarm from the array

function removeAlarm(value){
    let tempList = alarmList.filter((time) => time != value)
        alarmList.length = 0
        alarmList.push.apply(alarmList, tempList)
        
    
}


// injecting new html in the page to display the list

function addNewAlarm(newAlarm){
    const listItem = 
   ` <li class='time-list'>
        <span className="time">${newAlarm}</span>
        <button class='delete-alarm btn ' onClick="removeAlarm(this.value)" value="${newAlarm}" >Delete</button>
    </li>`

    allAlarms.innerHTML += listItem 

}

// extracting input values and adding alarm into the alarm list array

addAlarm.addEventListener('submit',(e)=>{
e.preventDefault()
 let h = formatNumber(addAlarm.hour.value)
 let m = formatNumber(addAlarm.minute.value)
 let s = formatNumber(addAlarm.second.value)

 const newAlarm = `${h}:${m}:${s}`
 console.log(newAlarm)

 if(alarmList.includes(newAlarm)){
    alert(`alarm for ${newAlarm} already set`)
 }else{
    alarmList.push(newAlarm)
    addNewAlarm(newAlarm)
    addAlarm.reset();
    
  }
})

// setinterval for making sure time is upto date
setInterval(currentTime, 1000)