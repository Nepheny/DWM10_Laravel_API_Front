// Show the users
let xhttp;
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
        let ul = document.createElement('ul');
        for (let i = 0; i < JSON.parse(this.responseText).length; i++) {
            let divUpdate = document.createElement('div');
            divUpdate.classList.add('hidden');

            let input = document.createElement('input');
            input.setAttribute('name', 'nameUpdate');
            input.setAttribute('value', JSON.parse(this.responseText)[i].name);

            let button2 = document.createElement('button');
            button2.dataset.action = 'update';
            button2.innerHTML = 'update';
            button2.dataset.id = JSON.parse(this.responseText)[i].id;

            let buttonUpdate = document.createElement('button');
            buttonUpdate.setAttribute('name', 'update');
            buttonUpdate.dataset.action = "showUpdate";
            buttonUpdate.innerHTML = "U";

            let divList = document.createElement('div');

            let li = document.createElement('li');
            li.classList.add('user-list');

            let p = document.createElement('p');
            p.innerHTML = JSON.parse(this.responseText)[i].name;

            let button = document.createElement('button');
            button.classList.add('user-button');
            button.setAttribute('name', 'delete');
            button.setAttribute('id', JSON.parse(this.responseText)[i].id);
            button.dataset.action = 'delete';
            button.innerHTML = "X";

            divUpdate.appendChild(input);
            divUpdate.appendChild(button2);
            divList.appendChild(p);
            divList.appendChild(button);
            divList.appendChild(buttonUpdate);
            li.appendChild(divUpdate);
            li.appendChild(divList);
            ul.appendChild(li);
        }
        document.querySelector('[data-view="home"]').appendChild(ul); 
    }
}
xhttp.open("GET", "http://192.168.99.99/users", true);
xhttp.send();

document.querySelector('body').addEventListener('click', function(el) {
    // Delete a user
    if(el.target.nodeName == 'BUTTON' && el.target.dataset.action == 'delete') {
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
    // Update a user
    } else if(el.target.nodeName == 'BUTTON' && el.target.dataset.action == 'showUpdate') {
        let divs = el.target.parentElement.parentElement.querySelectorAll('div');
        for (let i = 0; i < divs.length; i++) {
            divs[i].classList.toggle('hidden');
        }
    } else if(el.target.nodeName == 'BUTTON' && el.target.dataset.action == 'update') {
        let id = el.target.dataset.id;
        let newName = el.target.previousSibling.value;
        let xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                alert('Modification effectuée');
                location.reload();
            }
        }
        xhttp.open("POST", "http://192.168.99.99/user/update/" + id, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify({name: newName}));
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
        xhttp.send(JSON.stringify({name: document.querySelector('input[name=name]').value}));
    }
});