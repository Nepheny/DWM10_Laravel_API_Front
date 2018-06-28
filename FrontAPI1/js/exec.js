let exec = {
    init: function() {
      requestHelper.get('http://192.168.99.99/users', function(response){
        viewHelper.userModule(response, 'userList');
      })
    },
    initEventListeners: function() {
      document.querySelector('body').addEventListener('click', function(el) {
        if(el.target.nodeName == 'BUTTON' && el.target.dataset.action == 'delete') {
          requestHelper.delete('http://192.168.99.99/user?id=' + el.target.dataset.id, function(data) {
            exec.init();
          })
        } else if(el.target.nodeName == 'BUTTON' && el.target.dataset.action == 'insert') {
          if(el.target.previousElementSibling.value !== "") {
            requestHelper.post('http://192.168.99.99/user/new',{name: el.target.previousElementSibling.value}, function(data) {
              exec.init();
            })
          }
        } else if(el.target.nodeName == 'BUTTON' && el.target.dataset.action == 'showUpdate') {
          viewHelper.toggleUserView(el.target);
        }
        else if(el.target.nodeName == 'BUTTON' && el.target.dataset.action == 'update') {
          requestHelper.post('http://192.168.99.99/user/update/' + el.target.dataset.id, {name: el.target.previousSibling.value}, function(data) {
            exec.init();
          })
        }
      });
    }
  }