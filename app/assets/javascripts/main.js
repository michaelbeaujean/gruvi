var sine1 = T("sin", {freq:440, mul:.5});
var sine2 = T("sin", {freq:660, mul:.5});

$(document).ready(function(){
  $("#1").on('click', function(){
    T("perc", {r:2000}, sine1, sine2).on("ended", function() {
      this.pause();
    }).bang().play();
  });
});
