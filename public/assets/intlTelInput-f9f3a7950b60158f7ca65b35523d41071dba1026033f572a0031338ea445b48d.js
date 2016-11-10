!function(t){"function"==typeof define&&define.amd?define(["jquery"],function(i){t(i,window,document)}):"object"==typeof module&&module.exports?module.exports=t(require("jquery"),window,document):t(jQuery,window,document)}(function(t,i,e,n){"use strict";function a(i,e){this.telInput=t(i),this.options=t.extend({},r,e),this.ns="."+o+s++,this.isGoodBrowser=Boolean(i.setSelectionRange),this.hadInitialPlaceholder=Boolean(t(i).attr("placeholder"))}var o="intlTelInput",s=1,r={allowDropdown:!0,autoHideDialCode:!0,autoPlaceholder:!0,customPlaceholder:null,dropdownContainer:"",excludeCountries:[],formatOnInit:!0,geoIpLookup:null,initialCountry:"",nationalMode:!0,numberType:"MOBILE",onlyCountries:[],preferredCountries:["us","gb"],separateDialCode:!1,utilsScript:""},l={UP:38,DOWN:40,ENTER:13,ESC:27,PLUS:43,A:65,Z:90,SPACE:32,TAB:9};t(i).load(function(){t.fn[o].windowLoaded=!0}),a.prototype={_init:function(){return this.options.nationalMode&&(this.options.autoHideDialCode=!1),this.options.separateDialCode&&(this.options.autoHideDialCode=this.options.nationalMode=!1,this.options.allowDropdown=!0),this.isMobile=/Android.+Mobile|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),this.isMobile&&(t("body").addClass("iti-mobile"),this.options.dropdownContainer||(this.options.dropdownContainer="body")),this.autoCountryDeferred=new t.Deferred,this.utilsScriptDeferred=new t.Deferred,this._processCountryData(),this._generateMarkup(),this._setInitialState(),this._initListeners(),this._initRequests(),[this.autoCountryDeferred,this.utilsScriptDeferred]},_processCountryData:function(){this._processAllCountries(),this._processCountryCodes(),this._processPreferredCountries()},_addCountryCode:function(t,i,e){i in this.countryCodes||(this.countryCodes[i]=[]);var n=e||0;this.countryCodes[i][n]=t},_filterCountries:function(i,e){var n;for(n=0;n<i.length;n++)i[n]=i[n].toLowerCase();for(this.countries=[],n=0;n<u.length;n++)e(t.inArray(u[n].iso2,i))&&this.countries.push(u[n])},_processAllCountries:function(){this.options.onlyCountries.length?this._filterCountries(this.options.onlyCountries,function(t){return t!=-1}):this.options.excludeCountries.length?this._filterCountries(this.options.excludeCountries,function(t){return t==-1}):this.countries=u},_processCountryCodes:function(){this.countryCodes={};for(var t=0;t<this.countries.length;t++){var i=this.countries[t];if(this._addCountryCode(i.iso2,i.dialCode,i.priority),i.areaCodes)for(var e=0;e<i.areaCodes.length;e++)this._addCountryCode(i.iso2,i.dialCode+i.areaCodes[e])}},_processPreferredCountries:function(){this.preferredCountries=[];for(var t=0;t<this.options.preferredCountries.length;t++){var i=this.options.preferredCountries[t].toLowerCase(),e=this._getCountryData(i,!1,!0);e&&this.preferredCountries.push(e)}},_generateMarkup:function(){this.telInput.attr("autocomplete","off");var i="intl-tel-input";this.options.allowDropdown&&(i+=" allow-dropdown"),this.options.separateDialCode&&(i+=" separate-dial-code"),this.telInput.wrap(t("<div>",{"class":i})),this.flagsContainer=t("<div>",{"class":"flag-container"}).insertBefore(this.telInput);var e=t("<div>",{"class":"selected-flag"});e.appendTo(this.flagsContainer),this.selectedFlagInner=t("<div>",{"class":"iti-flag"}).appendTo(e),this.options.separateDialCode&&(this.selectedDialCode=t("<div>",{"class":"selected-dial-code"}).appendTo(e)),this.options.allowDropdown?(e.attr("tabindex","0"),t("<div>",{"class":"iti-arrow"}).appendTo(e),this.countryList=t("<ul>",{"class":"country-list hide"}),this.preferredCountries.length&&(this._appendListItems(this.preferredCountries,"preferred"),t("<li>",{"class":"divider"}).appendTo(this.countryList)),this._appendListItems(this.countries,""),this.countryListItems=this.countryList.children(".country"),this.options.dropdownContainer?this.dropdown=t("<div>",{"class":"intl-tel-input iti-container"}).append(this.countryList):this.countryList.appendTo(this.flagsContainer)):this.countryListItems=t()},_appendListItems:function(t,i){for(var e="",n=0;n<t.length;n++){var a=t[n];e+="<li class='country "+i+"' data-dial-code='"+a.dialCode+"' data-country-code='"+a.iso2+"'>",e+="<div class='flag-box'><div class='iti-flag "+a.iso2+"'></div></div>",e+="<span class='country-name'>"+a.name+"</span>",e+="<span class='dial-code'>+"+a.dialCode+"</span>",e+="</li>"}this.countryList.append(e)},_setInitialState:function(){var t=this.telInput.val();this._getDialCode(t)?this._updateFlagFromNumber(t,!0):"auto"!==this.options.initialCountry&&(this.options.initialCountry?this._setFlag(this.options.initialCountry,!0):(this.defaultCountry=this.preferredCountries.length?this.preferredCountries[0].iso2:this.countries[0].iso2,t||this._setFlag(this.defaultCountry,!0)),t||this.options.nationalMode||this.options.autoHideDialCode||this.options.separateDialCode||this.telInput.val("+"+this.selectedCountryData.dialCode)),t&&this._updateValFromNumber(t,this.options.formatOnInit)},_initListeners:function(){this._initKeyListeners(),this.options.autoHideDialCode&&this._initFocusListeners(),this.options.allowDropdown&&this._initDropdownListeners()},_initDropdownListeners:function(){var t=this,i=this.telInput.closest("label");i.length&&i.on("click"+this.ns,function(i){t.countryList.hasClass("hide")?t.telInput.focus():i.preventDefault()});var e=this.selectedFlagInner.parent();e.on("click"+this.ns,function(){!t.countryList.hasClass("hide")||t.telInput.prop("disabled")||t.telInput.prop("readonly")||t._showDropdown()}),this.flagsContainer.on("keydown"+t.ns,function(i){var e=t.countryList.hasClass("hide");!e||i.which!=l.UP&&i.which!=l.DOWN&&i.which!=l.SPACE&&i.which!=l.ENTER||(i.preventDefault(),i.stopPropagation(),t._showDropdown()),i.which==l.TAB&&t._closeDropdown()})},_initRequests:function(){var e=this;this.options.utilsScript?t.fn[o].windowLoaded?t.fn[o].loadUtils(this.options.utilsScript,this.utilsScriptDeferred):t(i).load(function(){t.fn[o].loadUtils(e.options.utilsScript,e.utilsScriptDeferred)}):this.utilsScriptDeferred.resolve(),"auto"===this.options.initialCountry?this._loadAutoCountry():this.autoCountryDeferred.resolve()},_loadAutoCountry:function(){var e=i.Cookies?Cookies.get("itiAutoCountry"):"";e&&(t.fn[o].autoCountry=e),t.fn[o].autoCountry?this.handleAutoCountry():t.fn[o].startedLoadingAutoCountry||(t.fn[o].startedLoadingAutoCountry=!0,"function"==typeof this.options.geoIpLookup&&this.options.geoIpLookup(function(e){t.fn[o].autoCountry=e.toLowerCase(),i.Cookies&&Cookies.set("itiAutoCountry",t.fn[o].autoCountry,{path:"/"}),setTimeout(function(){t(".intl-tel-input input").intlTelInput("handleAutoCountry")})}))},_initKeyListeners:function(){var t=this;this.telInput.on("keyup"+this.ns,function(){t._updateFlagFromNumber(t.telInput.val())}),this.telInput.on("cut"+this.ns+" paste"+this.ns+" keyup"+this.ns,function(){setTimeout(function(){t._updateFlagFromNumber(t.telInput.val())})})},_cap:function(t){var i=this.telInput.attr("maxlength");return i&&t.length>i?t.substr(0,i):t},_initFocusListeners:function(){var t=this;this.telInput.on("mousedown"+this.ns,function(i){t.telInput.is(":focus")||t.telInput.val()||(i.preventDefault(),t.telInput.focus())}),this.telInput.on("focus"+this.ns,function(){t.telInput.val()||t.telInput.prop("readonly")||!t.selectedCountryData.dialCode||(t.telInput.val("+"+t.selectedCountryData.dialCode),t.telInput.one("keypress.plus"+t.ns,function(i){i.which==l.PLUS&&t.telInput.val("")}),setTimeout(function(){var i=t.telInput[0];if(t.isGoodBrowser){var e=t.telInput.val().length;i.setSelectionRange(e,e)}}))}),this.telInput.on("blur"+this.ns,function(){var i=t.telInput.val(),e="+"==i.charAt(0);if(e){var n=t._getNumeric(i);n&&t.selectedCountryData.dialCode!=n||t.telInput.val("")}t.telInput.off("keypress.plus"+t.ns)})},_getNumeric:function(t){return t.replace(/\D/g,"")},_showDropdown:function(){this._setDropdownPosition();var t=this.countryList.children(".active");t.length&&(this._highlightListItem(t),this._scrollTo(t)),this._bindDropdownListeners(),this.selectedFlagInner.children(".iti-arrow").addClass("up")},_setDropdownPosition:function(){var e=this;if(this.options.dropdownContainer&&this.dropdown.appendTo(this.options.dropdownContainer),this.dropdownHeight=this.countryList.removeClass("hide").outerHeight(),!this.isMobile){var n=this.telInput.offset(),a=n.top,o=t(i).scrollTop(),s=a+this.telInput.outerHeight()+this.dropdownHeight<o+t(i).height(),r=a-this.dropdownHeight>o;if(this.countryList.toggleClass("dropup",!s&&r),this.options.dropdownContainer){var l=!s&&r?0:this.telInput.innerHeight();this.dropdown.css({top:a+l,left:n.left}),t(i).on("scroll"+this.ns,function(){e._closeDropdown()})}}},_bindDropdownListeners:function(){var i=this;this.countryList.on("mouseover"+this.ns,".country",function(){i._highlightListItem(t(this))}),this.countryList.on("click"+this.ns,".country",function(){i._selectListItem(t(this))});var n=!0;t("html").on("click"+this.ns,function(){n||i._closeDropdown(),n=!1});var a="",o=null;t(e).on("keydown"+this.ns,function(t){t.preventDefault(),t.which==l.UP||t.which==l.DOWN?i._handleUpDownKey(t.which):t.which==l.ENTER?i._handleEnterKey():t.which==l.ESC?i._closeDropdown():(t.which>=l.A&&t.which<=l.Z||t.which==l.SPACE)&&(o&&clearTimeout(o),a+=String.fromCharCode(t.which),i._searchForCountry(a),o=setTimeout(function(){a=""},1e3))})},_handleUpDownKey:function(t){var i=this.countryList.children(".highlight").first(),e=t==l.UP?i.prev():i.next();e.length&&(e.hasClass("divider")&&(e=t==l.UP?e.prev():e.next()),this._highlightListItem(e),this._scrollTo(e))},_handleEnterKey:function(){var t=this.countryList.children(".highlight").first();t.length&&this._selectListItem(t)},_searchForCountry:function(t){for(var i=0;i<this.countries.length;i++)if(this._startsWith(this.countries[i].name,t)){var e=this.countryList.children("[data-country-code="+this.countries[i].iso2+"]").not(".preferred");this._highlightListItem(e),this._scrollTo(e,!0);break}},_startsWith:function(t,i){return t.substr(0,i.length).toUpperCase()==i},_updateValFromNumber:function(e,n,a){n&&i.intlTelInputUtils&&this.selectedCountryData&&(t.isNumeric(a)||(a=this.options.nationalMode||"+"!=e.charAt(0)?intlTelInputUtils.numberFormat.NATIONAL:intlTelInputUtils.numberFormat.INTERNATIONAL),e=intlTelInputUtils.formatNumber(e,this.selectedCountryData.iso2,a)),e=this._beforeSetNumber(e),this.telInput.val(e)},_updateFlagFromNumber:function(i,e){i&&this.options.nationalMode&&this.selectedCountryData&&"1"==this.selectedCountryData.dialCode&&"+"!=i.charAt(0)&&("1"!=i.charAt(0)&&(i="1"+i),i="+"+i);var n=this._getDialCode(i),a=null;if(n){var o=this.countryCodes[this._getNumeric(n)],s=this.selectedCountryData&&t.inArray(this.selectedCountryData.iso2,o)!=-1;if(!s||this._isUnknownNanp(i,n))for(var r=0;r<o.length;r++)if(o[r]){a=o[r];break}}else"+"==i.charAt(0)&&this._getNumeric(i).length?a="":i&&"+"!=i||(a=this.defaultCountry);null!==a&&this._setFlag(a,e)},_isUnknownNanp:function(t,i){return"+1"==i&&this._getNumeric(t).length>=4},_highlightListItem:function(t){this.countryListItems.removeClass("highlight"),t.addClass("highlight")},_getCountryData:function(t,i,e){for(var n=i?u:this.countries,a=0;a<n.length;a++)if(n[a].iso2==t)return n[a];if(e)return null;throw new Error("No country data for '"+t+"'")},_setFlag:function(t,i){var e=this.selectedCountryData&&this.selectedCountryData.iso2?this.selectedCountryData:{};this.selectedCountryData=t?this._getCountryData(t,!1,!1):{},this.selectedCountryData.iso2&&(this.defaultCountry=this.selectedCountryData.iso2),this.selectedFlagInner.attr("class","iti-flag "+t);var n=t?this.selectedCountryData.name+": +"+this.selectedCountryData.dialCode:"Unknown";if(this.selectedFlagInner.parent().attr("title",n),this.options.separateDialCode){var a=this.selectedCountryData.dialCode?"+"+this.selectedCountryData.dialCode:"",o=this.telInput.parent();e.dialCode&&o.removeClass("iti-sdc-"+(e.dialCode.length+1)),a&&o.addClass("iti-sdc-"+a.length),this.selectedDialCode.text(a)}this._updatePlaceholder(),this.countryListItems.removeClass("active"),t&&this.countryListItems.find(".iti-flag."+t).first().closest(".country").addClass("active"),i||e.iso2===t||this.telInput.trigger("countrychange",this.selectedCountryData)},_updatePlaceholder:function(){if(i.intlTelInputUtils&&!this.hadInitialPlaceholder&&this.options.autoPlaceholder&&this.selectedCountryData){var t=intlTelInputUtils.numberType[this.options.numberType],e=this.selectedCountryData.iso2?intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2,this.options.nationalMode,t):"";e=this._beforeSetNumber(e),"function"==typeof this.options.customPlaceholder&&(e=this.options.customPlaceholder(e,this.selectedCountryData)),this.telInput.attr("placeholder",e)}},_selectListItem:function(t){if(this._setFlag(t.attr("data-country-code")),this._closeDropdown(),this._updateDialCode(t.attr("data-dial-code"),!0),this.telInput.focus(),this.isGoodBrowser){var i=this.telInput.val().length;this.telInput[0].setSelectionRange(i,i)}},_closeDropdown:function(){this.countryList.addClass("hide"),this.selectedFlagInner.children(".iti-arrow").removeClass("up"),t(e).off(this.ns),t("html").off(this.ns),this.countryList.off(this.ns),this.options.dropdownContainer&&(this.isMobile||t(i).off("scroll"+this.ns),this.dropdown.detach())},_scrollTo:function(t,i){var e=this.countryList,n=e.height(),a=e.offset().top,o=a+n,s=t.outerHeight(),r=t.offset().top,l=r+s,u=r-a+e.scrollTop(),h=n/2-s/2;if(r<a)i&&(u-=h),e.scrollTop(u);else if(l>o){i&&(u+=h);var d=n-s;e.scrollTop(u-d)}},_updateDialCode:function(t,i){var e,n=this.telInput.val();if(t="+"+t,"+"==n.charAt(0)){var a=this._getDialCode(n);e=a?n.replace(a,t):t}else{if(this.options.nationalMode||this.options.separateDialCode)return;if(n)e=t+n;else{if(!i&&this.options.autoHideDialCode)return;e=t}}this.telInput.val(e)},_getDialCode:function(i){var e="";if("+"==i.charAt(0))for(var n="",a=0;a<i.length;a++){var o=i.charAt(a);if(t.isNumeric(o)&&(n+=o,this.countryCodes[n]&&(e=i.substr(0,a+1)),4==n.length))break}return e},_getFullNumber:function(){var t=this.options.separateDialCode?"+"+this.selectedCountryData.dialCode:"";return t+this.telInput.val()},_beforeSetNumber:function(t){if(this.options.separateDialCode){var i=this._getDialCode(t);if(i){null!==this.selectedCountryData.areaCodes&&(i="+"+this.selectedCountryData.dialCode);var e=" "===t[i.length]||"-"===t[i.length]?i.length+1:i.length;t=t.substr(e)}}return this._cap(t)},handleAutoCountry:function(){"auto"===this.options.initialCountry&&(this.defaultCountry=t.fn[o].autoCountry,this.telInput.val()||this.setCountry(this.defaultCountry),this.autoCountryDeferred.resolve())},destroy:function(){this.allowDropdown&&(this._closeDropdown(),this.selectedFlagInner.parent().off(this.ns),this.telInput.closest("label").off(this.ns)),this.telInput.off(this.ns);var t=this.telInput.parent();t.before(this.telInput).remove()},getExtension:function(){return i.intlTelInputUtils?intlTelInputUtils.getExtension(this._getFullNumber(),this.selectedCountryData.iso2):""},getNumber:function(t){return i.intlTelInputUtils?intlTelInputUtils.formatNumber(this._getFullNumber(),this.selectedCountryData.iso2,t):""},getNumberType:function(){return i.intlTelInputUtils?intlTelInputUtils.getNumberType(this._getFullNumber(),this.selectedCountryData.iso2):-99},getSelectedCountryData:function(){return this.selectedCountryData||{}},getValidationError:function(){return i.intlTelInputUtils?intlTelInputUtils.getValidationError(this._getFullNumber(),this.selectedCountryData.iso2):-99},isValidNumber:function(){var e=t.trim(this._getFullNumber()),n=this.options.nationalMode?this.selectedCountryData.iso2:"";return i.intlTelInputUtils?intlTelInputUtils.isValidNumber(e,n):null},setCountry:function(t){t=t.toLowerCase(),this.selectedFlagInner.hasClass(t)||(this._setFlag(t),this._updateDialCode(this.selectedCountryData.dialCode,!1))},setNumber:function(i,e){this._updateFlagFromNumber(i),this._updateValFromNumber(i,t.isNumeric(e),e)},handleUtils:function(){i.intlTelInputUtils&&(this.telInput.val()&&this._updateValFromNumber(this.telInput.val(),this.options.formatOnInit),this._updatePlaceholder()),this.utilsScriptDeferred.resolve()}},t.fn[o]=function(i){var e=arguments;if(i===n||"object"==typeof i){var s=[];return this.each(function(){if(!t.data(this,"plugin_"+o)){var e=new a(this,i),n=e._init();s.push(n[0]),s.push(n[1]),t.data(this,"plugin_"+o,e)}}),t.when.apply(null,s)}if("string"==typeof i&&"_"!==i[0]){var r;return this.each(function(){var n=t.data(this,"plugin_"+o);n instanceof a&&"function"==typeof n[i]&&(r=n[i].apply(n,Array.prototype.slice.call(e,1))),"destroy"===i&&t.data(this,"plugin_"+o,null)}),r!==n?r:this}},t.fn[o].getCountryData=function(){return u},t.fn[o].loadUtils=function(i,e){t.fn[o].loadedUtilsScript?e&&e.resolve():(t.fn[o].loadedUtilsScript=!0,t.ajax({url:i,complete:function(){t(".intl-tel-input input").intlTelInput("handleUtils")},dataType:"script",cache:!0}))},t.fn[o].version="8.4.9";for(var u=[["Afghanistan (\u202b\u0627\u0641\u063a\u0627\u0646\u0633\u062a\u0627\u0646\u202c\u200e)","af","93"],["Albania (Shqip\xebri)","al","355"],["Algeria (\u202b\u0627\u0644\u062c\u0632\u0627\u0626\u0631\u202c\u200e)","dz","213"],["American Samoa","as","1684"],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1264"],["Antigua and Barbuda","ag","1268"],["Argentina","ar","54"],["Armenia (\u0540\u0561\u0575\u0561\u057d\u057f\u0561\u0576)","am","374"],["Aruba","aw","297"],["Australia","au","61",0],["Austria (\xd6sterreich)","at","43"],["Azerbaijan (Az\u0259rbaycan)","az","994"],["Bahamas","bs","1242"],["Bahrain (\u202b\u0627\u0644\u0628\u062d\u0631\u064a\u0646\u202c\u200e)","bh","973"],["Bangladesh (\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6)","bd","880"],["Barbados","bb","1246"],["Belarus (\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c)","by","375"],["Belgium (Belgi\xeb)","be","32"],["Belize","bz","501"],["Benin (B\xe9nin)","bj","229"],["Bermuda","bm","1441"],["Bhutan (\u0f60\u0f56\u0fb2\u0f74\u0f42)","bt","975"],["Bolivia","bo","591"],["Bosnia and Herzegovina (\u0411\u043e\u0441\u043d\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043e\u0432\u0438\u043d\u0430)","ba","387"],["Botswana","bw","267"],["Brazil (Brasil)","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1284"],["Brunei","bn","673"],["Bulgaria (\u0411\u044a\u043b\u0433\u0430\u0440\u0438\u044f)","bg","359"],["Burkina Faso","bf","226"],["Burundi (Uburundi)","bi","257"],["Cambodia (\u1780\u1798\u17d2\u1796\u17bb\u1787\u17b6)","kh","855"],["Cameroon (Cameroun)","cm","237"],["Canada","ca","1",1,["204","226","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde (Kabu Verdi)","cv","238"],["Caribbean Netherlands","bq","599",1],["Cayman Islands","ky","1345"],["Central African Republic (R\xe9publique centrafricaine)","cf","236"],["Chad (Tchad)","td","235"],["Chile","cl","56"],["China (\u4e2d\u56fd)","cn","86"],["Christmas Island","cx","61",2],["Cocos (Keeling) Islands","cc","61",1],["Colombia","co","57"],["Comoros (\u202b\u062c\u0632\u0631 \u0627\u0644\u0642\u0645\u0631\u202c\u200e)","km","269"],["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)","cd","243"],["Congo (Republic) (Congo-Brazzaville)","cg","242"],["Cook Islands","ck","682"],["Costa Rica","cr","506"],["C\xf4te d\u2019Ivoire","ci","225"],["Croatia (Hrvatska)","hr","385"],["Cuba","cu","53"],["Cura\xe7ao","cw","599",0],["Cyprus (\u039a\u03cd\u03c0\u03c1\u03bf\u03c2)","cy","357"],["Czech Republic (\u010cesk\xe1 republika)","cz","420"],["Denmark (Danmark)","dk","45"],["Djibouti","dj","253"],["Dominica","dm","1767"],["Dominican Republic (Rep\xfablica Dominicana)","do","1",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt (\u202b\u0645\u0635\u0631\u202c\u200e)","eg","20"],["El Salvador","sv","503"],["Equatorial Guinea (Guinea Ecuatorial)","gq","240"],["Eritrea","er","291"],["Estonia (Eesti)","ee","372"],["Ethiopia","et","251"],["Falkland Islands (Islas Malvinas)","fk","500"],["Faroe Islands (F\xf8royar)","fo","298"],["Fiji","fj","679"],["Finland (Suomi)","fi","358",0],["France","fr","33"],["French Guiana (Guyane fran\xe7aise)","gf","594"],["French Polynesia (Polyn\xe9sie fran\xe7aise)","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia (\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd)","ge","995"],["Germany (Deutschland)","de","49"],["Ghana (Gaana)","gh","233"],["Gibraltar","gi","350"],["Greece (\u0395\u03bb\u03bb\u03ac\u03b4\u03b1)","gr","30"],["Greenland (Kalaallit Nunaat)","gl","299"],["Grenada","gd","1473"],["Guadeloupe","gp","590",0],["Guam","gu","1671"],["Guatemala","gt","502"],["Guernsey","gg","44",1],["Guinea (Guin\xe9e)","gn","224"],["Guinea-Bissau (Guin\xe9 Bissau)","gw","245"],["Guyana","gy","592"],["Haiti","ht","509"],["Honduras","hn","504"],["Hong Kong (\u9999\u6e2f)","hk","852"],["Hungary (Magyarorsz\xe1g)","hu","36"],["Iceland (\xcdsland)","is","354"],["India (\u092d\u093e\u0930\u0924)","in","91"],["Indonesia","id","62"],["Iran (\u202b\u0627\u06cc\u0631\u0627\u0646\u202c\u200e)","ir","98"],["Iraq (\u202b\u0627\u0644\u0639\u0631\u0627\u0642\u202c\u200e)","iq","964"],["Ireland","ie","353"],["Isle of Man","im","44",2],["Israel (\u202b\u05d9\u05e9\u05e8\u05d0\u05dc\u202c\u200e)","il","972"],["Italy (Italia)","it","39",0],["Jamaica","jm","1876"],["Japan (\u65e5\u672c)","jp","81"],["Jersey","je","44",3],["Jordan (\u202b\u0627\u0644\u0623\u0631\u062f\u0646\u202c\u200e)","jo","962"],["Kazakhstan (\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d)","kz","7",1],["Kenya","ke","254"],["Kiribati","ki","686"],["Kuwait (\u202b\u0627\u0644\u0643\u0648\u064a\u062a\u202c\u200e)","kw","965"],["Kyrgyzstan (\u041a\u044b\u0440\u0433\u044b\u0437\u0441\u0442\u0430\u043d)","kg","996"],["Laos (\u0ea5\u0eb2\u0ea7)","la","856"],["Latvia (Latvija)","lv","371"],["Lebanon (\u202b\u0644\u0628\u0646\u0627\u0646\u202c\u200e)","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya (\u202b\u0644\u064a\u0628\u064a\u0627\u202c\u200e)","ly","218"],["Liechtenstein","li","423"],["Lithuania (Lietuva)","lt","370"],["Luxembourg","lu","352"],["Macau (\u6fb3\u9580)","mo","853"],["Macedonia (FYROM) (\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u0458\u0430)","mk","389"],["Madagascar (Madagasikara)","mg","261"],["Malawi","mw","265"],["Malaysia","my","60"],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania (\u202b\u0645\u0648\u0631\u064a\u062a\u0627\u0646\u064a\u0627\u202c\u200e)","mr","222"],["Mauritius (Moris)","mu","230"],["Mayotte","yt","262",1],["Mexico (M\xe9xico)","mx","52"],["Micronesia","fm","691"],["Moldova (Republica Moldova)","md","373"],["Monaco","mc","377"],["Mongolia (\u041c\u043e\u043d\u0433\u043e\u043b)","mn","976"],["Montenegro (Crna Gora)","me","382"],["Montserrat","ms","1664"],["Morocco (\u202b\u0627\u0644\u0645\u063a\u0631\u0628\u202c\u200e)","ma","212",0],["Mozambique (Mo\xe7ambique)","mz","258"],["Myanmar (Burma) (\u1019\u103c\u1014\u103a\u1019\u102c)","mm","95"],["Namibia (Namibi\xeb)","na","264"],["Nauru","nr","674"],["Nepal (\u0928\u0947\u092a\u093e\u0932)","np","977"],["Netherlands (Nederland)","nl","31"],["New Caledonia (Nouvelle-Cal\xe9donie)","nc","687"],["New Zealand","nz","64"],["Nicaragua","ni","505"],["Niger (Nijar)","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea (\uc870\uc120 \ubbfc\uc8fc\uc8fc\uc758 \uc778\ubbfc \uacf5\ud654\uad6d)","kp","850"],["Northern Mariana Islands","mp","1670"],["Norway (Norge)","no","47",0],["Oman (\u202b\u0639\u064f\u0645\u0627\u0646\u202c\u200e)","om","968"],["Pakistan (\u202b\u067e\u0627\u06a9\u0633\u062a\u0627\u0646\u202c\u200e)","pk","92"],["Palau","pw","680"],["Palestine (\u202b\u0641\u0644\u0633\u0637\u064a\u0646\u202c\u200e)","ps","970"],["Panama (Panam\xe1)","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru (Per\xfa)","pe","51"],["Philippines","ph","63"],["Poland (Polska)","pl","48"],["Portugal","pt","351"],["Puerto Rico","pr","1",3,["787","939"]],["Qatar (\u202b\u0642\u0637\u0631\u202c\u200e)","qa","974"],["R\xe9union (La R\xe9union)","re","262",0],["Romania (Rom\xe2nia)","ro","40"],["Russia (\u0420\u043e\u0441\u0441\u0438\u044f)","ru","7",0],["Rwanda","rw","250"],["Saint Barth\xe9lemy (Saint-Barth\xe9lemy)","bl","590",1],["Saint Helena","sh","290"],["Saint Kitts and Nevis","kn","1869"],["Saint Lucia","lc","1758"],["Saint Martin (Saint-Martin (partie fran\xe7aise))","mf","590",2],["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)","pm","508"],["Saint Vincent and the Grenadines","vc","1784"],["Samoa","ws","685"],["San Marino","sm","378"],["S\xe3o Tom\xe9 and Pr\xedncipe (S\xe3o Tom\xe9 e Pr\xedncipe)","st","239"],["Saudi Arabia (\u202b\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629\u202c\u200e)","sa","966"],["Senegal (S\xe9n\xe9gal)","sn","221"],["Serbia (\u0421\u0440\u0431\u0438\u0458\u0430)","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65"],["Sint Maarten","sx","1721"],["Slovakia (Slovensko)","sk","421"],["Slovenia (Slovenija)","si","386"],["Solomon Islands","sb","677"],["Somalia (Soomaaliya)","so","252"],["South Africa","za","27"],["South Korea (\ub300\ud55c\ubbfc\uad6d)","kr","82"],["South Sudan (\u202b\u062c\u0646\u0648\u0628 \u0627\u0644\u0633\u0648\u062f\u0627\u0646\u202c\u200e)","ss","211"],["Spain (Espa\xf1a)","es","34"],["Sri Lanka (\u0dc1\u0dca\u200d\u0dbb\u0dd3 \u0dbd\u0d82\u0d9a\u0dcf\u0dc0)","lk","94"],["Sudan (\u202b\u0627\u0644\u0633\u0648\u062f\u0627\u0646\u202c\u200e)","sd","249"],["Suriname","sr","597"],["Svalbard and Jan Mayen","sj","47",1],["Swaziland","sz","268"],["Sweden (Sverige)","se","46"],["Switzerland (Schweiz)","ch","41"],["Syria (\u202b\u0633\u0648\u0631\u064a\u0627\u202c\u200e)","sy","963"],["Taiwan (\u53f0\u7063)","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand (\u0e44\u0e17\u0e22)","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad and Tobago","tt","1868"],["Tunisia (\u202b\u062a\u0648\u0646\u0633\u202c\u200e)","tn","216"],["Turkey (T\xfcrkiye)","tr","90"],["Turkmenistan","tm","993"],["Turks and Caicos Islands","tc","1649"],["Tuvalu","tv","688"],["U.S. Virgin Islands","vi","1340"],["Uganda","ug","256"],["Ukraine (\u0423\u043a\u0440\u0430\u0457\u043d\u0430)","ua","380"],["United Arab Emirates (\u202b\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629\u202c\u200e)","ae","971"],["United Kingdom","gb","44",0],["United States","us","1",0],["Uruguay","uy","598"],["Uzbekistan (O\u02bbzbekiston)","uz","998"],["Vanuatu","vu","678"],["Vatican City (Citt\xe0 del Vaticano)","va","39",1],["Venezuela","ve","58"],["Vietnam (Vi\u1ec7t Nam)","vn","84"],["Wallis and Futuna","wf","681"],["Western Sahara (\u202b\u0627\u0644\u0635\u062d\u0631\u0627\u0621 \u0627\u0644\u063a\u0631\u0628\u064a\u0629\u202c\u200e)","eh","212",1],["Yemen (\u202b\u0627\u0644\u064a\u0645\u0646\u202c\u200e)","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"],["\xc5land Islands","ax","358",1]],h=0;h<u.length;h++){var d=u[h];u[h]={name:d[0],iso2:d[1],dialCode:d[2],priority:d[3]||0,areaCodes:d[4]||null}}});