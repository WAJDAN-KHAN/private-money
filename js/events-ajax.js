window.addEventListener("DOMContentLoaded", function () {

    let events = null
        , eventsNext = document.querySelector('.item-events__next')
        , eventsPrev = document.querySelector('.item-events__prev')
        , eventsBtns = document.querySelector('.item-events__btns')
        , eventsTabCalendar = document.querySelector('.calendar-tab')
        , conferenceColor = '#EACAE2'
        , webinarColor = '#CFCBF7'
        , privateEventColor = '#8EE7DE'
        , btnCrossColor = '#FFFFFF'

    

    function setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        }
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString()
        }
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey
            let optionValue = options[optionKey]
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue
            }
        }
        document.cookie = updatedCookie
    }

    function getCookie(name) {
        var nameEQ = name + "="
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) == ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    function checkEventsTypes(calendar, eventType, element) {

        if (getCookie(eventType) == 'true') {
            setCookie(eventType, false, 1)
            element.children[1].remove()
        } else {
            setCookie(eventType, true, 1)
            element.insertAdjacentHTML('beforeend', '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_10641_195536)" ><path d="M2.70398 2.5L13.5368 13.3328" stroke="' + btnCrossColor + '" stroke-width="1.4" stroke-miterlimit="10"/><path d="M2.70398 13.3328L13.5368 2.5" stroke="' + btnCrossColor + '" stroke-width="1.4" stroke-miterlimit="10"/></g><defs><clipPath id="clip0_10641_195536"><rect width="16" height="16" fill="white" /></clipPath></defs></svg>')
        }

        element.classList.toggle('btn_pressed')

        events = Object.values(calendar.currentData.eventStore.defs)

        events.forEach((event) => {

            if (event.extendedProps.eventType != eventType && getCookie(eventType) == 'true') {
                event.ui.display = 'none'
            } else if (event.extendedProps.eventType == eventType && getCookie(eventType) == 'false') {
                event.ui.display = 'none'
            }

            if (getCookie('Conferences') == 'true' && event.extendedProps.eventType == 'Conferences') {
                event.ui.display = 'auto'
            }
            if (getCookie('Webinars') == 'true' && event.extendedProps.eventType == 'Webinars') {
                event.ui.display = 'auto'
            }
            if (getCookie('PrivateEvent') == 'true' && event.extendedProps.eventType == 'PrivateEvent') {
                event.ui.display = 'auto'
            }
        })
        calendar.next()
        calendar.prev()
    }

    setCookie('Conferences', true, 1)
    setCookie('Webinars', true, 1)
    setCookie('PrivateEvent', true, 1)

    const calendarEl = document.getElementById('Calendar')

    const getAllEvents = (data) => {

        const sendData = new Promise((resolve, reject) => {
            resolve(adm_ajax.ajaxurl)
        })

        sendData.then((url) => {

            fetch(url, {
                method: 'POST',
                body: data,
            })
                .then(response => response.json())
                .then(data => {

                    const calendar = new FullCalendar.Calendar(calendarEl, {
                        // plugins: [ interactionPlugin ],
                        // droppable: true,
                        height: 'auto',
                        customButtons: {
                            conferences: {
                                text: 'Conferences',
                                click: function (e) {
                                    e.preventDefault()
                                    checkEventsTypes(calendar, 'Conferences', e.currentTarget)
                                }
                            },
                            webinar: {
                                text: 'Webinar',
                                click: function (e) {
                                    e.preventDefault()
                                    checkEventsTypes(calendar, 'Webinars', e.currentTarget)
                                }
                            },
                            privateEvent: {
                                text: 'Private Event',
                                click: function (e) {
                                    e.preventDefault()
                                    checkEventsTypes(calendar, 'PrivateEvent', e.currentTarget)
                                }
                            }
                        },
                        headerToolbar: {
                            left: 'prev,title,next',
                            center: '',
                            right: 'conferences,webinar,privateEvent'
                        },
                        eventClick: function (info) {
                            info.jsEvent.preventDefault()

                            if (info.event.url) {
                                window.open(info.event.url)
                            }
                        }
                    })

                    data.forEach(element => {

                        let eventColor = ''
                        if (element.event_type == 'Conference') eventColor = conferenceColor
                        if (element.event_type == 'Webinars') eventColor = webinarColor
                        if (element.event_type == 'PrivateEvent') eventColor = privateEventColor

                        calendar.addEvent({
                            url: element.url,
                            title: element.title,
                            start: element.start,
                            end: element.end,
                            display: 'auto',
                            color: eventColor,   // an option!
                            textColor: '#303030',
                            className: element.event_type,
                            extendedProps: {
                                eventType: element.event_type
                            },
                        })
                    })

                    calendar.render()
                    

                    if (eventsTabCalendar) eventsTabCalendar.addEventListener('click', function(){
                        calendar.next()
                        calendar.prev()
                    })

                    let conferencesBtn = document.querySelector('.fc-conferences-button')
                    let webinarBtn = document.querySelector('.fc-webinar-button')
                    let privateEventBtn = document.querySelector('.fc-privateEvent-button')

                    conferencesBtn.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"><circle cx="8" cy="8.38086" r="8" fill="' + conferenceColor + '" /></svg>')
                    webinarBtn.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"><circle cx="8" cy="8.38086" r="8" fill="' + webinarColor + '" /></svg>')
                    privateEventBtn.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"><circle cx="8" cy="8.38086" r="8" fill="' + privateEventColor + '" /></svg>')
                    conferencesBtn.insertAdjacentHTML('beforeend', '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_10641_195536)"><path d="M2.70398 2.5L13.5368 13.3328" stroke="#FFFFFF" stroke-width="1.4" stroke-miterlimit="10"></path><path d="M2.70398 13.3328L13.5368 2.5" stroke="#FFFFFF" stroke-width="1.4" stroke-miterlimit="10"></path></g><defs><clipPath id="clip0_10641_195536"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>')
                    webinarBtn.insertAdjacentHTML('beforeend', '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_10641_195536)"><path d="M2.70398 2.5L13.5368 13.3328" stroke="#FFFFFF" stroke-width="1.4" stroke-miterlimit="10"></path><path d="M2.70398 13.3328L13.5368 2.5" stroke="#FFFFFF" stroke-width="1.4" stroke-miterlimit="10"></path></g><defs><clipPath id="clip0_10641_195536"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>')
                    privateEventBtn.insertAdjacentHTML('beforeend', '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_10641_195536)"><path d="M2.70398 2.5L13.5368 13.3328" stroke="#FFFFFF" stroke-width="1.4" stroke-miterlimit="10"></path><path d="M2.70398 13.3328L13.5368 2.5" stroke="#FFFFFF" stroke-width="1.4" stroke-miterlimit="10"></path></g><defs><clipPath id="clip0_10641_195536"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>')
                    conferencesBtn.classList.add('btn_pressed')
                    webinarBtn.classList.add('btn_pressed')
                    privateEventBtn.classList.add('btn_pressed')

                })
                .catch((error) => {
                    console.error('Error:', error)
                })

        })
    }

    let formData = new FormData()

    formData.set('action', 'adm_get_all_events_to_calendar')

    if (calendarEl) getAllEvents(formData)

    const switchMonth = (data) => {
        const sendData = new Promise((resolve, reject) => {
            resolve(adm_ajax.ajaxurl)
        })

        sendData.then((url) => {

            fetch(url, {
                method: 'POST',
                body: data,
            })
                .then(response => response.json())
                .then(data => {
                    // let eventsTop = document.querySelector('.blog-page-top-section')
                    let eventsMain = document.querySelector('.item-events__cover')
                    // eventsTop.innerHTML = data.html_top
                    eventsMain.innerHTML = data.html_main
                })
                .catch((error) => {
                    console.error('Error:', error)
                })

        })
    }

    const setEventsDateInfo = (currentMonth, year) => {

        let date = new Date(),
            elemItemMonth = document.querySelector('.item-events__month')

        date.setDate(31)

        date.setDate(date.getDate() == 31 ? date.getDate() - 30 : date.getDate())

        currentMonth--

        date.setMonth(currentMonth) // Fix toruble with increasing month
        date.setFullYear(year)

        elemItemMonth.innerHTML = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }


    if (eventsPrev) eventsPrev.addEventListener('click', function () {

        let data = new FormData(),
            prevMonth = parseInt(eventsBtns.dataset.prevMonth),
            currentMonth = parseInt(eventsBtns.dataset.currentMonth),
            nextMonth = parseInt(eventsBtns.dataset.nextMonth),
            prevYear = parseInt(eventsBtns.dataset.prevYear),
            nextYear = parseInt(eventsBtns.dataset.nextYear)

        data.set('prevMonth', prevMonth)
        data.set('prevYear', prevYear)
        data.set('action', 'adm_get_events_by_month')
        data.set('direction', 'prev')

        if (prevMonth == 12) {
            prevYear = prevYear - 1
        }

        if (prevMonth == 1) {
            prevMonth = 12
            currentMonth = 1
        } else if (prevMonth == 12) {
            currentMonth = 12
            prevMonth = prevMonth - 1
        } else {
            prevMonth = prevMonth - 1
            currentMonth = currentMonth - 1
        }

        if (nextMonth == 3) {
            nextMonth = 2
        } else if (nextMonth == 1) {
            nextMonth = 12
        } else {
            nextMonth = nextMonth - 1
        }

        eventsBtns.dataset.prevMonth = prevMonth
        eventsBtns.dataset.currentMonth = currentMonth
        eventsBtns.dataset.nextMonth = nextMonth
        eventsBtns.dataset.prevYear = prevYear
        eventsBtns.dataset.nextYear = prevMonth == 10 ? nextYear - 1 : nextYear

        setEventsDateInfo(currentMonth, prevYear)

        switchMonth(data)
    })

    if (eventsNext) eventsNext.addEventListener('click', function () {

        let data = new FormData(),
            prevMonth = parseInt(eventsBtns.dataset.prevMonth),
            currentMonth = parseInt(eventsBtns.dataset.currentMonth),
            nextMonth = parseInt(eventsBtns.dataset.nextMonth),
            prevYear = parseInt(eventsBtns.dataset.prevYear),
            nextYear = parseInt(eventsBtns.dataset.nextYear)

        data.set('nextMonth', eventsBtns.dataset.nextMonth)
        data.set('nextYear', eventsBtns.dataset.nextYear)
        data.set('action', 'adm_get_events_by_month')
        data.set('direction', 'next')

        if (nextMonth == 1) {
            prevYear += 1
            currentMonth = 1
        } else if (nextMonth == 11) {
            currentMonth = 11
        } else {
            currentMonth += 1
        }
        

        if (prevMonth == 10) {
            prevMonth = 11
        } else if (prevMonth == 12) {
            prevMonth = 1
        } else {
            prevMonth++
        }

        if (nextMonth == 12) {
            nextMonth = 1
        } else {
            nextMonth += 1
        }

        eventsBtns.dataset.prevMonth = prevMonth
        eventsBtns.dataset.currentMonth = currentMonth
        eventsBtns.dataset.nextMonth = nextMonth
        eventsBtns.dataset.nextYear = prevMonth == 11 ? nextYear + 1 : nextYear
        eventsBtns.dataset.prevYear = prevYear

        setEventsDateInfo(currentMonth, nextYear)

        switchMonth(data)
    })

})
