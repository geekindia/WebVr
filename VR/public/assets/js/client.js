var screenNumber = window.location.hash.substring(1);
//*******************************************************************//
//*              COMMON COMPONENTS WRAPPER / OBJECT                 *//
//*******************************************************************//
(function(MODULE, undefined) {

    MODULE.addHTML = (function() {
        function _subModule() {
            /* Caching HTML objects */
            var params = {
                    _intro:         $("#intro"),
                    _register:      $("#register"),
                    _fbLogin:       $(".fbLogin"),
                    _selectCar:     $("#selectCar"),
                    _answers:       $("#myAnswer"),
                    _buttonsCars:   $("#buttons_cars"),
                    _gotoTestDrive:  $(".gotoTestDrive"),
                    _friendsComments:  $(".friendsComments ul"),
                    _testDrive: $("#testDrive"),
                    _thankYou: $("#thankYou"),
                    _accelerate: $(".accelerate"),
                    _break: $(".break")
                },
                socket = io.connect(IP),
                totalAnsers = 0,
                userFullName = '',
                deviceWatch = false,
                accelerate = 10,
                posts = {"posts":[{name:"Parag",comment:"Nice Car"}]},
                _htmlContent = '<% _.each(posts, function(post){ %><li><h5><%= post.name %></h5><p><%= post.comment %></p></li><% }); %>',
                infoTemplate = _.template(_htmlContent,posts),
                commonApp = {

                    initialize:function(){
                        var _st = setTimeout(function(){
                            socket.emit('userConnected', true);
                            params._intro.fadeOut(500);
                            params._register.fadeIn(500);
                        }, 3000);

                        $('#f50DD').ddslick({
                            onSelected: function(selectedData){
                                var _str = "#"+selectedData.selectedData.value;
                                $(_str).trigger("click");
                            }   
                        });

                        $('#carModel').ddslick({
                            onSelected: function(selectedData){
                                var _str = "#"+selectedData.selectedData.value;
                                $("#f50DD, #gallardoDD, #camaroDD, #veyronDD").hide();
                                $("#"+selectedData.selectedData.value+"DD").show();
                                $(_str).trigger("click");
                            }   
                        });

                        $('#camaroDD').ddslick({
                            onSelected: function(selectedData){
                                var _str = "#"+selectedData.selectedData.value;
                                $(_str).trigger("click");
                            }   
                        });

                        $('#gallardoDD').ddslick({
                            onSelected: function(selectedData){
                                var _str = "#"+selectedData.selectedData.value;
                                $(_str).trigger("click");
                            }   
                        });

                        $('#veyronDD').ddslick({
                            onSelected: function(selectedData){
                                var _str = "#"+selectedData.selectedData.value;
                                $(_str).trigger("click");
                            }   
                        });
                        
                        
                        socket.emit('resetAll', true);

                        params._fbLogin.on("click",function(e){
                            socket.emit('userRegister', userFullName);
                            params._register.fadeOut();
                            params._selectCar.fadeIn();
                            $("#veyron").trigger("click");
                            deviceWatch = true;
                            commonApp.checkDeviceUpdate();
                            commonApp.checkDeviceVibrate(200);
                            params._friendsComments.html(infoTemplate(posts));
                        });

                        params._accelerate.on("click",function(){
                            socket.emit('accelerate', 1);
                            accelerate += 10;
                            $(".speed span").html(accelerate);
                        });

                        params._break.on("click",function(){
                            socket.emit('break', 0);
                            if(accelerate <= 10){
                                accelerate = 20;
                            }
                            accelerate -= 10;
                            $(".speed span").html(accelerate);
                        });
                        

                        params._buttonsCars.find("button").on("click",function(e){
                            var _id = $(this).attr("id");
                            socket.emit('carSelected', _id);

                            $("#buttons_materials div").hide();
                            $("#buttons_materials").find("."+_id).show();
                        });

                        $("#buttons_materials button").on("click",function(){
                            var _id = $(this).attr("id");
                            socket.emit('colorSelected', _id);
                        });

                        params._gotoTestDrive.click(function(e){
                            socket.emit('testDrive', true);
                            params._selectCar.fadeOut();
                            params._testDrive.fadeIn();
                        });

                    },
                    listeningSockets: function(){

                        socket.on('clientDetected', function (data) {
                            
                        });

                        socket.on('resetAllPages', function (data) {
                            //window.location.href= "client.html";
                        });
                        
                        socket.on("carInfoReceived",function(data){
                            commonApp.speak(data);
                        });
                        socket.on("accidentHappened",function(data){
                            commonApp.checkDeviceVibrate(1200);
                            //params._testDrive.fadeOut(500);
                            //params._thankYou.fadeIn(500);
                        });
                        
                    },

                    checkDeviceUpdate: function(){
                        if (window.DeviceOrientationEvent && deviceWatch == true) {
                            window.addEventListener('deviceorientation', function(eventData) {
                                socket.emit('deviceUpdates',{clientX:Math.round(eventData.gamma),clientY:Math.round(eventData.beta), clientZ:Math.round(eventData.alpha)});
                          }, false);
                        }
                    },

                    checkDeviceVibrate: function(n){
                        // enable vibration support
                            navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
                             
                            if (navigator.vibrate) {
                                // vibration API supported
                                    navigator.vibrate(n);
                            }
                    },
                    speak: function(text) {
                      // Create a new instance of SpeechSynthesisUtterance.
                      window.speechSynthesis.cancel();
                      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
                    },
                    init: function() {
                        commonApp.initialize();
                        commonApp.listeningSockets();
                    }
                },
                //Calling all functionalities
                applyFunctionality = function() {
                    commonApp.init();
                }
                /**
                 * Init call
                 */
            this.init = function() {
                applyFunctionality();
                return this; /*this refere to MODULE.subModule*/
            };
            return this.init(); /*this refere to MODULE.subModule.init()*/
        }
        return new _subModule(); /*creating a new object of subModule rather then a funtion*/
    }());
    /*
     * Check to evaluate whether '
    MODULE ' exists in the global namespace - if not, assign window.MODULE an object literal
     */
}(window.occult = window.occult || {}));



//Facebook API Integration
 
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1458272517816714',
      xfbml      : true,
      cookie     : true,
      version    : 'v2.3'
    });
};
 
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}
(document, 'script', 'facebook-jssdk'));