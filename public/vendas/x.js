function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function getN(id) {
  var i = Math.floor(sessionStorage[id]);
  if(!i) i = 0;
  return i;
}

$('.row a.btn').on('click', function(ev) {
  ev.preventDefault();
  var id = 'sl' + $(this).data('id');
  var i = Math.floor(getN(id));
  if(!i) i = 0;
  i++;
  if(i < 101) {
  sessionStorage[id] = i;
  }
  console.log(id, i);
  refreshData();
});

function refreshData() {
  $('[data-id]').each(function(i, e) {
    e = $(e);
    var id = 'sl' + e.data('id');
    e.parent().find('.n').html(getN(id));
    console.log(id, getN(id));
  });
}

refreshData();
