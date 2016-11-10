
(function(){
    $(document).turboready(function(){


              $("#user_contact").onff('keypress.ur_contact', function(e){
                      //console.log('test');
                      if($(this).val().length >= 10){
                        e.preventDefault();
                        return false;
                      }
                });

              $('#edit_user,#new_user').onff('submit.ur_form',function(e){
                        var number = $("#user_contact").intlTelInput("getNumber");
                        //console.log(number);
                        if(number.length > 13){
                          e.preventDefault();
                          return false;
                        }
                        $("#user_contact").val(number);
                });
  });
})();

(function(){

  $(document).turboready(function(){
    $(".flexslider").flexslider({animation: "slide"});
       $('input.ui-date-picker').datepicker({dateFormat: "yy-mm-dd"});
        $('input.ui-datetime-picker').datetimepicker({dateFormat: 'yy-mm-dd', timeFormat: 'hh:mm:ss tt'});
        $(document).on('mouseover','.toast',function(){$(this).remove()}); //remove toast message if hovered
        $(document).on('click', '#search_lists', function(){
            Turbolinks.visit('/list/find?q=' + encodeURIComponent($("#auto_title").val()));
        });
        $(document).on('keydown',"#auto_title", function(e){
          if(e.keyCode === 13){
            Turbolinks.visit('/list/find?q=' + encodeURIComponent($(this).val()));
          }
        });

        $("#user_contact").intlTelInput({
            formatOnInit: true,
            separateDialCode: true
          });
  });

})();
