let runtime = {
    toggleView: function () {
        // If there is a token saved
        if(authHelper.getToken() !== null) {
            requestHelper.get("http://192.168.99.99/users?token=" + authHelper.getToken(), function (data) {
                // If the api send back success, we are connected
                if(data.success !== null) {
                    viewHelper.displaySection('main');
                } else {
                    uthHelper.removeToken();
                    viewHelper.displaySection('login');
                }
            });
        } else {
            viewHelper.displaySection('login');
        }
    },
    addEventListeners: function () {
        document.querySelector('body').addEventListener('click', function (el) {
            // Login action
            if(el.target.dataset.action == 'login') {
                let user = document.querySelector('[data-value="user"]').value;
                let pass = document.querySelector('[data-value="password"]').value;
                // If the user and password have been filled
                if(user !== "" && pass !== "") {
                    requestHelper.post('http://192.168.99.99/login', {name: user, password: pass}, function (data) {
                        if(data.error == undefined) {
                            authHelper.setToken(data.successMessage);
                            flashHelper.showMessage('success', 'Connection successfull');
                        } else {
                            authHelper.removeToken();
                            flashHelper.showMessage('error', 'Connection error');
                        }
                        runtime.toggleView();
                    });
                }
            }
        });
    }
}