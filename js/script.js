// Show the users
let xhttp;
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
        let ul = document.createElement('ul');
        for (let i = 0; i < JSON.parse(this.responseText).length; i++) {
            let li = document.createElement('li');
            let p = document.createElement('p');
            p.innerHTML = JSON.parse(this.responseText)[i].name;

            let button = document.createElement('button');
            button.setAttribute('name', 'delete');
            button.setAttribute('id', JSON.parse(this.responseText)[i].id);
            button.innerHTML = "X";

            li.appendChild(button);
            li.appendChild(p);
            ul.appendChild(li);
        }
        document.querySelector('[data-view="home"]').appendChild(ul); 
    }
}
xhttp.open("GET", "http://192.168.99.99/users", true);
xhttp.send();

// Delete a user
document.querySelector('body').addEventListener('click', function(el) {
    if(el.target.nodeName == 'BUTTON') {
        let id = el.target.getAttribute('id');
        let xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                alert(JSON.parse(this.responseText).successMessage);
                location.reload();
            }
        }
        xhttp.open("DELETE", "http://192.168.99.99/user?id=" + id, true);
        xhttp.send();
    }
});

// Add a user
document.querySelector('[data-action="insert"]').addEventListener('click', function () {
    if(document.querySelector('input[name=name]').value !== '') {
        let xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                response = JSON.parse(this.responseText);
                if(response.success !== undefined) {
                    alert('Mot de passe :' + response.successMessage);
                    location.reload();
                } else {
                    alert(response.errorMessage);
                    location.reload();
                }
            }
        }
        xhttp.open("POST", "http://192.168.99.99/user/new", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify({name:document.querySelector('input[name=name]').value}));
    }
});