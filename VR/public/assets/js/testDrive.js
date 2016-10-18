//*******************************************************************//
//*              COMMON COMPONENTS WRAPPER / OBJECT                 *//
//*******************************************************************//

var _url = "http://"+IP,
socket = io.connect(IP);

(function(MODULE, undefined) {

    MODULE.addHTML = (function() {
        function _subModule() {
            /* Caching HTML objects */
            var params = {
                    _logo:    $(".logo"),
                    _intro:    $("#intro"),
                    _connect:    $("#connect"),
                    _userName:    $("p.userName"),
                    _carSelection: $("#carSelection"),
                    _carContent : $("#carContent")
                },
                //* Product Info Show Hide *//
                _htmlContent = '<h1><%= brandName %></h1><p><%= carContent %></p><ul><li class="groundClearance"><%= ground %></li><li class="mileage"><%= mileage %></li><li class="enginPower"><%= engine %></li></ul>',
                infoTemplate = _.template(_htmlContent),

        //template({brand: "Brand X", sku:"IO3992", description:"Some random description",care:"Some care information",material:"Silk, Cotton"});
                commonApp = {
                    setup: function(){

                    },
                    listenSocket: function(){
                        socket.on('clientDetected', function (data) {
                            params._intro.fadeOut(500);
                            params._connect.fadeIn(500);
                            commonApp.speak(globalData.msgs.welcome);
                        });
                        socket.on('userName', function (data) {
                            params._connect.fadeOut(500);
                            params._carSelection.fadeIn(500);
                            params._userName.html("Welcome, "+data);
                            params._carContent.html(infoTemplate(globalData.cars["veyron"]));
                        });
                         socket.on('carSelectionDone', function (data) {
                            params._carContent.html(infoTemplate(globalData.cars[data]));
                            var _carInfo = globalData.cars[data].brandName+"! "+globalData.cars[data].carContent+". Ground Clearance Info: "+globalData.cars[data].ground+" .And Mileage is "+globalData.cars[data].mileage+" ."+globalData.cars[data].brandName+" has "+globalData.cars[data].engine+" engine.";
                            socket.emit('carInfo', _carInfo);
                            initCarButton(data);
                        });
                        socket.on('colorSelectionDone', function (data) {
                            $("#"+data).trigger("click");
                        });
                        socket.on('deviceUpdateData', function (data) {
                            rotateCar(data);
                        });

                        socket.on('resetAllPages', function (data) {
                             var _url = window.location.host;
                                window.location.href= "display.html";
                        });

                        socket.on('gotoTestDrive', function (data) {
                            var _url = window.location.host;
                                window.location.href = "testdrive.html"; 
                        });

                        socket.on('testDriveData', function (data) {
                            initCarButton(data.model);
                            var _st = setTimeout(function(){
                                $("#"+data.color).trigger("click");
                            },500);
                            var _timer = 20;
                            var _offTime = setInterval(function(){
                                _timer = _timer - 1;
                                $("#timer p").html(_timer);
                                if(_timer <= 0){
                                    clearInterval(_offTime);
                                    $("#testDrive").hide();
                                    $("#thankyou").show();
                                }
                            },1000);
                        });
                        socket.on("accelerateGo",function(data){
                            accelerate += 0.3;
                        });

                        socket.on("breakGo",function(data){
                            accelerate -= 0.7;
                            if(accelerate <= 1){
                                accelerate = 1;
                            }
                        });
                        socket.on("accidentHappened",function(data){
                            //commonApp.checkDeviceVibrate(1200);
                            //$("#testDrive").fadeOut(200).remove();
                            //$("#thankyou").fadeIn(500);
                        });
                        
                    },
                    increaseAccelerate: function(val){
                        var increment = 0;
                        if(val == 0){
                            increment = -0.7;
                        }else if(val == 1){
                            increment = 0.3;
                        }else{
                            increment = 0;
                        }
                        var _timeout = setTimeout(function(){
                             accelerate += increment;
                        }, 300);

                    },
                    accident: function(){
                        socket.emit('accident', true);
                    },
                    speak: function(text) {
                      // Create a new instance of SpeechSynthesisUtterance.
                      var utterance = new SpeechSynthesisUtterance(text);
                          window.speechSynthesis.speak(utterance);
                    },
                    annyang:function(){
                        if (annyang) {
                          // Let's define our first command. First the text we expect, and then the function it should call
                          var commands = {
                            'show tps report': function() {
                              $('#tpsreport').animate({bottom: '-100px'});
                            }
                          };

                          // Add our commands to annyang
                          annyang.addCommands(commands);

                          // Start listening. You can call this here, or attach this call to an event, button, etc.
                          annyang.start();
                        }
                    },
                    init: function() {
                        commonApp.setup();
                        commonApp.listenSocket();
                        window.accidentFn = commonApp.accident();
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