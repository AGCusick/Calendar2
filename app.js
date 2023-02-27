const date = new Date();
const dayArray = [];
const taskArray = [];
const idArray = [];
const addTask = document.querySelector('.add-task');
const newEvent = document.querySelector('.event-form');

const getStorage = JSON.parse(localStorage.getItem('event')) || [];
taskArray.push(getStorage)

const renderCalendar = () => {

    const monthDays = document.querySelector('.days');

    const calendar = document.querySelector('.calendar')

    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    let prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    let month = date.getMonth()
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

   let showMonth = document.querySelector('.date h1');
   let showDate = document.querySelector('.date p');
   showDate.innerHTML = date.toDateString();
    showMonth.innerHTML = months[date.getMonth()];
    let days = '';
    for (x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`

    }

    for (i = 1; i <= lastDay; i++) {

        days += `<div class="day">${i}</div>`;
        
        
    }

    
    for (j = 1; j < 7 - lastDayIndex; j++) {
        days += `<div>${j}</div>`;
    }

    monthDays.innerHTML = days

    monthDays.addEventListener('click', (e)=>{
        e.preventDefault();
        let taskDay = e.target;
        taskDay.id = Math.random(1,1000);
        console.log(taskDay.id)
        newEvent.style.display = 'block';
        newEvent.addEventListener('submit', (e)=>{
            e.preventDefault();
            let li = document.createElement('li');
            li.innerText = addTask.value;
            taskDay.appendChild(li)
                let taskObj = {
                    task: addTask.value,
                    taskId: taskDay.id,
                }
                taskArray.push(taskObj);
                console.log(taskArray);
            localStorage.setItem('event', JSON.stringify(taskArray));
            addTask.value = '';
            newEvent.style.display = 'none';
        },{once: true})
    })
}

document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1)
    renderCalendar();
})
document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1)
    renderCalendar();
})



renderCalendar();
