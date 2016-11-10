//hack to remove all attached handlers before assigning
//used for turbolinks

(function(){
  jQuery.fn.onff = function(){

    var args = []; //copy to create array from arguments object
    for(var i = 0; i < arguments.length; i++ ){
      args.push(arguments[i]);
    }

    jQuery.fn.off.apply(this, args.slice(0, -1));
    //console.log(args.slice(0, -1));
    //console.log(this, 'removed handlers');
    jQuery.fn.on.apply(this, args);
    //console.log(args);
    //console.log(this, 'attached handlers');

  };

  function _hashFnv32a(str, asString, seed) {
      /*jshint bitwise:false */
      var i, l,
          hval = (seed === undefined) ? 0x811c9dc5 : seed;

      for (i = 0, l = str.length; i < l; i++) {
          hval ^= str.charCodeAt(i);
          hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
      }
      if( asString ){
          // Convert to 8 digit hex string
          return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
      }
      return hval >>> 0;
  };

  jQuery.fn.turboready = function(callback){

    var p = true;
    var f = function(){
      //console.log('p  ', p);
      if(p){p = false;}else{return;}
      callback();
    }
    var uniq_id = _hashFnv32a(callback.toString(), true);
    //console.log(uniq_id);
    var events = ['ready', 'page:load', 'turbolinks:load', 'page:change', '']; //empty item for join to work
    var arr = events.join('.' + uniq_id + ' ');
    var args = [];
    args.push(arr);
    //console.log(args);
    args.push(f);
    jQuery.fn.onff.apply(this, args);
  };



  $.back = function(elem){
    try{
        var url = history.back();
    }catch(err){

    }

    (function(elem, url){
      setTimeout(function(){
        if(url === undefined){
          elem.disabled = true;
          $(elem).attr('disabled', 'disabled').addClass('disabled_link');
        }
      }, 2000);
    })(elem, url);
  };

  $.forward = function(elem){
    try{
        var url = history.forward();
    }catch(err){

    }
    (function(elem, url){
      setTimeout(function(){
        if(url === undefined){
          elem.disabled = true;
          $(elem).attr('disabled', 'disabled').addClass('disabled_link');
        }
      }, 2000);
    })(elem, url);

  };


})();
