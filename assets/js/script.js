const container = $('.container');

let timeSlots;

if(JSON.parse(localStorage.getItem('timeSlots')) == null){
    
    timeSlots = [
        {
            time: 8,
            timeString: '8am',
            todo: '',
        },
        {
            time: 9,
            timeString: '9am',
            todo: '',
        },
        {
            time: 10,
            timeString: '10am',
            todo: '',
        },
        {
            time: 11,
            timeString: '11am',
            todo: '',
        },
        {
            time: 12,
            timeString: '12pm',
            todo: '',
        },
        {
            time: 13,
            timeString: '1pm',
            todo: '',
        },
        {
            time: 14,
            timeString: '2pm',
            todo: '',
        },
        {
            time: 15,
            timeString: '3pm',
            todo: '',
        },
        {
            time: 16,
            timeString: '4pm',
            todo: '',
        },
        {
            time: 17,
            timeString: '5pm',
            todo: '',
        },
        ]
} else {
    timeSlots = JSON.parse(localStorage.getItem('timeSlots'))
}

const checkColor = (time, el) => {
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
}
else if(time > parseInt(moment().format('k'))) {
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
            button.removeClass('unsaved')
            e.preventDefault();
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
        checkColor(slot.time, textArea)
        setInterval(() => {
            checkColor(slot.time, textArea)
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


updateTime();
renderCalendar();
setInterval(updateTime, 1000);