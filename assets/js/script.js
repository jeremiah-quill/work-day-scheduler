// Variables
const container = $('.container');


// Functions
const addAMPMtoHour = (hour) => {
    let numHour = parseInt(hour)
    if(numHour > 12) {
        return (numHour - 12).toString() + "pm"
    } else {
        if(hour === 0) {
            return "12am"
        }
        return hour.toString() + "am"
    }
}

const buildTimeSlots = (start, end) =>{
    let newTimeSlots = []
    for(let i=start; i<=end; i++) {
        let slot = {time: i, timeString: addAMPMtoHour(i)}
        newTimeSlots.push(slot)
    }
    // localStorage.setItem("timeSlots", JSON.stringify(newTimeSlots));
    return newTimeSlots
}

// Compare slot time with current time, and change class/color accordingly
const compareSlotToTime = (time, el) => {
if((time) < parseInt(moment().format('k'))) {
    if(!el.hasClass('past')){
        el.addClass('past');
       if(el.hasClass('present')){
           el.removeClass('present')
       };
       if(el.hasClass('future')){
           el.removeClass('future')
       }
    }
} else if(time === parseInt(moment().format('k'))) {
    if(!el.hasClass('present')){
        el.addClass('present');
       if(el.hasClass('past')){
           el.removeClass('past')
       };
       if(el.hasClass('future')){
           el.removeClass('future')
       }
    }
} else if(time > parseInt(moment().format('k'))) {
    if(!el.hasClass('future')){
        el.addClass('future');
        if(el.hasClass('past')){
            el.removeClass('past')
        };
        if(el.hasClass('present')){
            el.removeClass('present')
        }
    }
}
}

const renderCalendar = () => {
    container.empty()
    timeSlots.forEach((slot) => {
        let row = $('<div>').addClass('row')
        let hourDiv = $('<div>').addClass('hour').text(slot.timeString)
        let textArea = $('<textarea>').val(slot.todo)
        let button = $('<button>').addClass('saveBtn').text('Save')
        button.on('click', (e) => {
            e.preventDefault();
            button.removeClass('unsaved')
            slot.todo = textArea.val();
            localStorage.setItem('timeSlots', JSON.stringify(timeSlots))
        })
        textArea.on('keyup', () => {
            if(slot.todo !== textArea.val()) {
                button.addClass('unsaved')
            } else if(slot.todo == textArea.val()){
                button.removeClass('unsaved')
            }
        })
        compareSlotToTime(slot.time, textArea)
        setInterval(() => {
            compareSlotToTime(slot.time, textArea)
        }, 1000)
        row.append(hourDiv).append(textArea).append(button)
        container.append(row);
    })
    console.log('rendered')
}

const updateTime = () => {
    // add time and date to header
    const hour = moment().format('hh:mm:ss');
    const dayOfWeek = moment().format('dddd'); 
    const dayOfYear = moment().format('MMMM Do');
    const timeSpan = `${dayOfWeek}, ${dayOfYear} ${hour}`;
    $('#currentDay').text(timeSpan);
};

// If no timeslots in local storage, build timeslots from 8am to 5pm
// If there are timelots in local storage, use those
let timeSlots;

if(JSON.parse(localStorage.getItem('timeSlots')) == null){
    timeSlots = buildTimeSlots(8, 17)
} else {
    timeSlots = JSON.parse(localStorage.getItem('timeSlots'))
}


updateTime();
setInterval(updateTime, 1000);
renderCalendar();