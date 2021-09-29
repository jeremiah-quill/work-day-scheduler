const container = $('.container');

let timeSlots;

if(JSON.parse(localStorage.getItem('timeSlots')) == null){
    timeSlots = [
        {
            time: '8',
            timeString: '8am',
            todo: '',
            state: 'past'
        },
        {
            time: '9',
            timeString: '9am',
            todo: '',
            state: 'past'
        },
        {
            time: '10',
            timeString: '10am',
            todo: '',
            state: 'past'
        },
        {
            time: '11',
            timeString: '11am',
            todo: '',
            state: 'past'
        },
        {
            time: '12',
            timeString: '12pm',
            todo: '',
            state: 'past'
        },
        {
            time: '13',
            timeString: '1pm',
            todo: '',
            state: 'past'
        },
        {
            time: '14',
            timeString: '2pm',
            todo: '',
            state: 'past'
        },
        {
            time: '15',
            timeString: '3pm',
            todo: '',
            state: 'past'
        },
        {
            time: '16',
            timeString: '4pm',
            todo: '',
            state: 'past'
        },
        {
            time: '17',
            timeString: '5pm',
            todo: '',
            state: 'past'
        },
        ]
} else {
    timeSlots = JSON.parse(localStorage.getItem('timeSlots'))
}

const checkColor = (time, textArea) => {
if((parseInt(time)) < parseInt(moment().format('k'))) {
    if(!textArea.hasClass('past')){
        textArea.addClass('past');
       if(textArea.hasClass('present')){
           textArea.removeClass('present')
       };
       if(textArea.hasClass('future')){
           textArea.removeClass('future')
       }
    }
} else if(parseInt(time) === parseInt(moment().format('k'))) {
    if(!textArea.hasClass('present')){
        textArea.addClass('present');
       if(textArea.hasClass('past')){
           textArea.removeClass('past')
       };
       if(textArea.hasClass('future')){
           textArea.removeClass('future')
       }
    }
}
else if(parseInt(time) > parseInt(moment().format('k'))) {
    if(!textArea.hasClass('future')){
        textArea.addClass('future');
       if(textArea.hasClass('past')){
           textArea.removeClass('past')
       };
       if(textArea.hasClass('present')){
           textArea.removeClass('present')
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
            slot.todo = textArea.val();
            localStorage.setItem('timeSlots', JSON.stringify(timeSlots))
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