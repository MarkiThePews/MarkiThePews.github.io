$(document).ready(function() {
  $('textarea').each(function(i, area) {
    $(area).on('change keyup paste focus', function() {
      var decode = ($(area).attr("data-type") === "encode") ? 0 : 1
      var data = $(area).val();
      doEncoding(data, decode, function(kq) {
        $("#output").text(kq);
      });
	  $("#container textarea").css('background-color', 'white');
	  $(area).css('background-color', 'blueviolet');
    })
  });

});

function doEncoding(data, decode, write) {
    kq = "";
    if(decode) {
      kq = data.replace(/([0-7]{3})/g,function(match) { return String.fromCharCode(parseInt(match,8))});
    } else {
      for(i=0; i < data.length; i++)
      {
        binchar = data[i].charCodeAt(0).toString(8);
        for(j = 3 - binchar.length; j > 0; j--) {
          binchar = "0" + binchar;
        }

        kq += binchar ;
      }     
    }
  write(kq);
}