let viewHelper = {
    eventListeners: {},
    userModule: function(datas, target) {
      toInsert = "";
      for (var i = 0; i < datas.length; i++) {
        // @TODO Make it cool again
        toInsert += "<li> <div class='%CLASS%'> <p>%NAME%</p><button data-action='delete' data-id='%ID%' name='delete'>Delete</button> <button data-action='showUpdate' name='update'>Update</button> </div><div class='hidden'><input type='text' name='name' value='%NAMEBIS%'><button data-id='%IDBIS%' data-action='update' name='update'>Update</button></div></li>";
        toInsert = toInsert.replace("%NAME%", datas[i].name);
        toInsert = toInsert.replace("%NAMEBIS%", datas[i].name);
  
        toInsert = toInsert.replace("%ID%", datas[i].id);
        toInsert = toInsert.replace("%IDBIS%", datas[i].id);
  
        toInsert = toInsert.replace("%CLASS%", datas[i].class ? datas[i].class : '');
      }
      document.querySelector('[data-view="' + target + '"]').innerHTML = toInsert;
    },
    toggleUserView: function(target) {
      divs = target.parentElement.parentElement.querySelectorAll('div');
      for (var i = 0; i < divs.length; i++) {
        divs[i].classList.toggle('hidden');
      }
    }
  }