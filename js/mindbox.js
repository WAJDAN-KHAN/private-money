window.addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search,
        urlParams = new URLSearchParams(queryString),
        token = urlParams.get('token'),
        elForm = document.querySelector('#subscription-form') ?? document.querySelector('#action-form')


    if (token) {
        setTimeout(() => {
            let data = {
                action: 'get',
                token,
                uuid: getCookie('mindboxDeviceUUID')
            }
            fetch('/mindbox_ajax/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then((data) => {
                    document.querySelector('footer').style.display = 'block' //why
                    document.querySelector('.section__subscription').style.display = 'block'
                    document.querySelector('.form__block_preloader').style.display = 'none'
                    if (document.querySelector('#email-text')) {
                        //what is email-text
                        document.querySelector('#email-text').innerText = data.mindbox.response.customer.email
                        document.querySelector('#email-text').setAttribute('href', `mailto:${data.mindbox.response.customer.email}`)
                        if (document.querySelector('input[name=contact-email]')) {
                            document.querySelector('input[name=contact-email]').value = data.mindbox.response.customer.email
                        }
                        if (data.mindbox.response.customer.subscriptions) {
                            data.mindbox.response.customer.subscriptions.forEach((sub) => {
                                if (sub.pointOfContact == 'Email') {
                                    switch (sub.topic) {
                                        case 'Programs':
                                            if (sub.isSubscribed) document.querySelector('input[name=programs]').checked = true
                                            break;
                                        case 'Blogs and Educational':
                                            if (sub.isSubscribed) document.querySelector('input[name=info-company-blog]').checked = true
                                            break;
                                        case 'Company News':
                                            if (sub.isSubscribed) document.querySelector('input[name=companies-news]').checked = true
                                            break;
                                        case 'Webinars':
                                            if (sub.isSubscribed) document.querySelector('input[name=webinars]').checked = true
                                            break;
                                        case 'Market_news':
                                            if (sub.isSubscribed) document.querySelector('input[name=weekly-digest]').checked = true
                                            break;
                                        case 'Expos':
                                            if (sub.isSubscribed) document.querySelector('input[name=industry-events]').checked = true
                                            break;
                                        case 'RateSheet':
                                            if (sub.isSubscribed) document.querySelector('input[name=rate-sheets]').checked = true
                                            break;
                                    }
                                }
                            })
                        }

                    }

                })
        }, 1000)
    }

    if (window.location.pathname == '/subscription-management-contact/') {
        elForm.querySelectorAll('input[required]').forEach(inp => {
            inp.addEventListener('input', (e) => {
                let getClosetCol = inp.closest('.action-form__item')
                if (e.target.value && getClosetCol) {
                    if (getClosetCol.querySelector('.form__invalid')) {
                        getClosetCol.querySelector('.form__invalid').style.display = 'none'
                    }
                }
            })
        })
    }
    document.querySelectorAll('button[type=submit]').forEach(button => {
        if (!button.classList.contains('form__submit-bp')) {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                let form = this.closest('form');

                let elPopup = document.querySelector('.popup-form-section')

                let action = ''
                let data = {}

                if (window.location.pathname == '/subscription-management-contact/') {
                    form = document.querySelector('.form')
                    action = 'create'
                    if (checkFormInputs(form, 'action-form__item')) return;
                } else if (window.location.pathname == '/subscription-management/') {
                    form = document.querySelector('.form')
                    action = 'set'
                } else {
                    action = 'set'
                }

                const formData = new FormData(form)
                //Form on page events
                if (form.id == 'subscribe_to_news_events') {
                    action = 'create_subscribe_to_news_events'
                    elPopup = form.nextElementSibling

                    if (checkFormInputs(form, 'subscribe_to_news_events', false)) return;

                    data = {
                        action,
                        token,
                        uuid: getCookie('mindboxDeviceUUID'),
                        email: formData.get('subscribe_to_news_events'),
                        subs: {
                            webinars: 'on',
                        }
                    }
                } else if (form.id == 'subscribe_news_form') {
                    action = 'create_subscribe_to_news'
                    elPopup = form.nextElementSibling

                    if (checkFormInputs(form, 'subscribe_news_form', true)) return;

                    data = {
                        action,
                        token,
                        uuid: getCookie('mindboxDeviceUUID'),
                        email: formData.get('subscribe_to_news'),
                        subs: {
                            weekly: 'on',
                            industry: 'on',
                            news: 'on',
                        }
                    }
                } else if (form.id == 'subscribe_blog-page' || form.id == 'subscribe_to_news_blog' || form.id == 'subscribe_to_news_blog-responsive') {
                    action = 'create_subscribe_to_news_blog'
                    elPopup = form.nextElementSibling

                    if (checkFormInputs(form, 'subscribe_blog-page', false)) return;

                    data = {
                        action,
                        token,
                        uuid: getCookie('mindboxDeviceUUID'),
                        email: formData.get('subscribe_to_news_blog'),
                        subs: {
                            blog: 'on',
                            news: 'on'
                        }
                    }
                } else {
                    data = {
                        action,
                        token,
                        uuid: getCookie('mindboxDeviceUUID'),
                        email: formData.get('contact-email'),
                        firstName: formData.get('first-name'),
                        lastName: formData.get('last-name'),
                        subs: {
                            programs: formData.get('programs'),
                            blog: formData.get('info-company-blog'),
                            weekly: formData.get('weekly-digest'),
                            industry: formData.get('industry-events'),
                            webinars: formData.get('webinars'),
                            news: formData.get('companies-news'),
                            rate: formData.get('rate-sheets'),
                        }
                    }
                }

                if (elPopup) {
                    if (form.id !== 'subscribe_to_news_events') {
                        elPopup.classList.add('popup-email-show')
                    } else {
                        elPopup.classList.add('popup-show')
                    }
                    elPopup.classList.add('preloader')
                }

                if (form.id == 'subscribe_news_form'
                    || form.id == 'subscribe_blog-page'
                    || form.id == 'subscribe_to_news_blog-responsive'
                    || form.id == 'subscribe_to_news_blog'
                    || form.id == 'subscribe_to_news_events'
                ) {
                    form.style.display = "none";
                }


                const sendData = new Promise((resolve, reject) => {
                    if (formData.get('g-recaptcha-response')) {
                        resolve(formData.get('g-recaptcha-response'))
                    } else {
                        grecaptcha.ready(() => {
                            grecaptcha.execute('6Lf1OXsiAAAAAGBQopB7aSwnXBGRnQQj-0S9cCYj', { action: 'submit' }).then((token) => {
                                console.log('token', token)
                                resolve(token)
                            });
                        });
                    }
                })

                sendData.then((token) => {
                    data['g-captcha'] = token
                    fetch('/mindbox_ajax/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (!data.error) {
                                if (elPopup) {
                                    elPopup.classList.remove('preloader');
                                    elPopup.classList.add('success');
                                }
                            } else {
                                if (elPopup) {
                                    elPopup.classList.remove('preloader');
                                    elPopup.classList.add('error');
                                }
                            }
                        })
                })
            })
        }
    });
})


function checkFormInputs(elForm, closetColClass, isFooter = false) {

    hasErrors = false,
        focusSet = false

    elForm.querySelectorAll('input[required]').forEach(inp => {
        console.log(inp);
        let getClosetCol = inp.closest('.' + closetColClass)
        console.log(getClosetCol);

        if (!inp.value && getClosetCol) {
            if (!focusSet) {
                focusSet = true
                inp.focus();
            }

            if (isFooter) {
                inp.style.border = "1px solid #FF393D"
            } else {
                getClosetCol.querySelector('.form__invalid').style.display = 'block'
            }

            hasErrors = true

        } else {
            getClosetCol.querySelector('.form__invalid').style.display = 'none'
        }

        if (
            inp.id == 'contact-email' ||
            inp.id == 'contact-email_blog' ||
            inp.id == 'contact-email_blog_responsive' ||
            inp.id == 'contact-email_event') {

            if (!validateEmail(inp)) {

                if (isFooter) {
                    inp.style.border = "1px solid #FF393D";
                } else {
                    getClosetCol.querySelector('.form__invalid').style.display = 'block';
                }

                inp.focus();
                hasErrors = true
            }
            console.log('hasErrors: ', hasErrors);
        }
    })

    if (hasErrors) {
        elForm.scrollIntoView()
        return hasErrors;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function validateEmail(input) {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}