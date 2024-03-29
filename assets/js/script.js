// Variables
const container = $('.container');


// Functions
const addAMPMtoHour = (hour) => {
    let numHour = parseInt(hour)
    if(numHour == 24) {
        return "12am"
    } else if(numHour > 12) {
        return (numHour - 12).toString() + "pm"
    } 
    else {
        return hour.toString() + "am"
    }
}

const buildTimeSlots = (start, end) =>{
    let newTimeSlots = []
    for(let i=start; i<=end; i++) {
        let slot = {time: i, timeString: addAMPMtoHour(i)}
        newTimeSlots.push(slot)
    }
    localStorage.setItem("timeSlots", JSON.stringify(newTimeSlots));
    console.log(newTimeSlots)
    return newTimeSlots
}

const getUserInputs = () => {
    startSelect = $('#start-select')
    endSelect = $('#end-select')
    let startOption = parseInt(startSelect.find(":selected").val())
    let endOption = parseInt(endSelect.find(":selected").val())
    
    if(startOption > endOption) {
        console.log('cant do that')
        $('#message-container').text('Please choose an ending hour equal to or later than your starting hour.')
        endSelect.css('color', 'tomato')
        setTimeout(() => {
            $('#message-container').empty()
            endSelect.css('color', 'black')
        }, 5000)
    } else {
        timeSlots = buildTimeSlots(parseInt(startOption), parseInt(endOption))
        renderCalendar()
    }
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
        let button = $('<button>').addClass('saveBtn animate__animated animate__slideOutLeft').text('Save')
        button.on('click', (e) => {
            e.preventDefault();
            // button.removeClass('unsaved')
            button.addClass('animate__slideOutLeft')
            slot.todo = textArea.val();
            localStorage.setItem('timeSlots', JSON.stringify(timeSlots))
        })
        textArea.on('keyup', () => {
            if(slot.todo !== textArea.val()) {
                button.removeClass('animate__slideOutLeft')
                button.addClass('animate__slideInLeft')
                button.addClass('unsaved')
            } else if(slot.todo == textArea.val()){
                button.removeClass('animate__slideInLeft')
                button.addClass('animate__slideOutLeft')
                // button.removeClass('unsaved')
            } 
            if (slot.todo == undefined && textArea.val() == '') {
                button.removeClass('animate__slideInLeft')
                button.addClass('animate__slideOutLeft')
                // button.removeClass('unsaved')
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
    // const hour = moment().format('hh:mm:ss');

    const dayOfWeek = moment().format('dddd'); 
    const dayOfYear = moment().format('MMMM Do');
    // const timeSpan = `${dayOfWeek}, ${dayOfYear} ${hour}`;
    const timeSpan = `${dayOfWeek}, ${dayOfYear}`;

    $('#currentDay').text(timeSpan);
};


const renderSelectForm = () => {
    let startTime = timeSlots[0].time
    let endTime = timeSlots[timeSlots.length -1].time

    $('#start-select :selected').prop('selected', false);
    $('#end-select :selected').prop('selected', false);

    $('#start-select').val(startTime).prop('selected', true);
    $('#end-select').val(endTime).prop('selected', true);
}




// If no timeslots in local storage, build timeslots from 8am to 5pm
// If there are timelots in local storage, use those
let timeSlots;

if(JSON.parse(localStorage.getItem('timeSlots')) == null){
    timeSlots = buildTimeSlots(8, 17)
    localStorage.setItem('timeSlots', JSON.stringify(timeSlots))

} else {
    timeSlots = JSON.parse(localStorage.getItem('timeSlots'))
}




renderSelectForm()
updateTime();
setInterval(updateTime, 1000);
renderCalendar();
$('#submit-button').on('click', getUserInputs)