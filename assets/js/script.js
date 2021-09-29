let future = 3
let present = 2
let past = 1
const container = $('.container');

let timeSlots = [
{
    time: 8,
    timeString: '8am',
    todo: '',
    state: past
},
{
    time: 9,
    timeString: '9am',
    todo: '',
    state: past
},
{
    time: 10,
    timeString: '10am',
    todo: '',
    state: present
},
{
    time: 11,
    timeString: '11am',
    todo: '',
    state: future
},
{
    time: 12,
    timeString: '12pm',
    todo: '',
    state: future
},
{
    time: 1,
    timeString: '1pm',
    todo: '',
    state: future
},
{
    time: 2,
    timeString: '2pm',
    todo: '',
    state: future
},
{
    time: 3,
    timeString: '3pm',
    todo: '',
    state: future
},
{
    time: 4,
    timeString: '4pm',
    todo: '',
    state: future
},
{
    time: 5,
    timeString: '5pm',
    todo: '',
    state: future
},
]



const renderCalendar = () => {
    container.empty()
    timeSlots.forEach(slot => {
    let row = $('<div>').addClass('row')
    let hourDiv = $('<div>').addClass('hour').text(slot.timeString)
    let textArea = $('<textarea>').val(slot.todo)
    let button = $('<button>').addClass('saveBtn').text('Save')
    button.on('click', (e) => {
        e.preventDefault();
        console.log(e.target)
    })

    if(slot.state === past) {
        row.addClass('past')
    }
    else if(slot.state === present) {
        row.addClass('present')
    }
    else {
        row.addClass('future')
    }

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
    const timeSpan = `${dayOfWeek}, ${dayOfYear}, ${hour}`
    $('#currentDay').text(timeSpan)
    // renderCalendar()

    // style row depending on hour
}


setInterval(updateTime, 1000)

updateTime()

function minuteCount(minutesAfterHour) {

    const now          = new Date();
    const hours        = now.getHours();
    const minutes      = now.getMinutes();
    const seconds      = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    waitUntilNextMinute = setTimeout(minuteCount, 60000 - seconds * 1000 - milliseconds);

    if(minutes % 60 === minutesAfterHour) {
        // doSomethingHourly();
        renderCalendar()
        console.log('new hour')
    }

}

minuteCount(0);

