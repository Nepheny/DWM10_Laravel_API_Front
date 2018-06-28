let flashHelper = {
    showMessage: function (severity, message) {
        let messages = document.querySelectorAll('[data-view="message"]');
        for (let i = 0; i < messages.length; i++) {
            messages[i].classList.add('hidden');
        }
        switch (severity) {
            case 'success':
                document.querySelector('[data-severity="success"]').classList.remove('hidden');
                document.querySelector('[data-severity="success"]').innerHTML = message;
                break;
            case 'warning':
                document.querySelector('[data-severity="warning"]').classList.remove('hidden');
                document.querySelector('[data-severity="warning"]').innerHTML = message;
                break;
            case 'error':
                document.querySelector('[data-severity="error"]').classList.remove('hidden');
                document.querySelector('[data-severity="error"]').innerHTML = message;
                break;
        }
        setTimeout(function () {
            let messages = document.querySelectorAll('[data-view="message"]');
            for (let i = 0; i < messages.length; i++) {
                messages[i].classList.add('hidden');
                messages[i].innerHTML = "";
            }
        }, 3000);
    }
}