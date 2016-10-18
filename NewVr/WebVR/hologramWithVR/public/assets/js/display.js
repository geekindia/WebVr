//*******************************************************************//
//*              COMMON COMPONENTS WRAPPER / OBJECT                 *//
//*******************************************************************//
(function(MODULE, undefined) {

    MODULE.addHTML = (function() {
        function _subModule() {
            /* Caching HTML objects */
            var params = {
                    _logo:    $(".logo"),
                    _intro:    $("#intro"),
                    _connect:    $("#connect"),
                    _userName:    $("div.userName"),
                    _carSelection: $("#carSelection"),
                    _carContent : $("#carContent"),
                    _qrCode : $('#qrCode'),
                    _url : $('.url')
                },
                _url = "http://"+IP,
                socket = io.connect(IP),
                myDataRef = new Firebase('https://kioskultrasonic.firebaseio.com/distance'),
                //* Product Info Show Hide *//
                _htmlContent = '<h1><%= brandName %></h1><p><%= carContent %></p><ul><li class="groundClearance"><%= ground %></li><li class="mileage"><%= mileage %></li><li class="enginPower"><%= engine %></li></ul>',
                infoTemplate = _.template(_htmlContent),
                isSensorOn = false,

        //template({brand: "Brand X", sku:"IO3992", description:"Some random description",care:"Some care information",material:"Silk, Cotton"});
                commonApp = {
                    setup: function(){
                        params._url.html("TO EXPERIENCE OPEN "+_url);
                        params._qrCode.attr('src', qrcodeURL);
                    },
                    listenSocket: function(){
                        myDataRef.on('value', function(snapshot) {
                              //We'll fill this in later.
                              if(isSensorOn){
                                if(snapshot.val() < 15){
                                    isSensorOn = false;
                                    commonApp.speak(globalData.msgs.welcome);
                                }
                              }
                        });

                        socket.on('sensorAllowed', function (data) {
                            //commonApp.speak(globalData.msgs.welcome);
                            isSensorOn = true;
                            console.log(isSensorOn);
                        });
                        socket.on('manualSpeak', function (data) {
                            params._intro.fadeOut(500);
                            params._connect.fadeIn(500);
                            commonApp.speak(globalData.msgs.welcome);
                        });
                        socket.on('userName', function (data) {
                            params._connect.fadeOut(500);
                            params._carSelection.fadeIn(500);
                            params._userName.html("Welcome "+data + ". You have selected the "+ infoTemplate(globalData.cars["veyron"]));
                            //params._carContent.html(infoTemplate(globalData.cars["veyron"]));
                        });
                         socket.on('carSelectionDone', function (data) {
                            //myDataRef.on({"distance":"300"});

                            params._userName.html("Welcome "+data + ". You have selected the "+ infoTemplate(globalData.cars[data]));
                            //params._carContent.html(infoTemplate(globalData.cars[data]));
                            var _carInfo = globalData.cars[data].brandName+"! "+globalData.cars[data].carContent+". Ground Clearance Info: "+globalData.cars[data].ground+" .And Mileage is "+globalData.cars[data].mileage+" ."+globalData.cars[data].brandName+" has "+globalData.cars[data].engine+" engine.";
                            socket.emit('carInfo', _carInfo);
                            initCarButton(data);
                        });
                        socket.on('colorSelectionDone', function (data) {
                            $("#buttons_materials button").removeClass('selected');
                            $("#"+data).trigger("click").addClass('selected');
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
                            console.log(data);
                            initCarButton(data.model);
                            var _st = setTimeout(function(){
                                $("#"+data.color).trigger("click");
                            },500);
                        });

                        socket.on('renderWebVr', function (data) {                            
                            var _url = window.location.host;
                            window.location.href = "webVr.html"; 
                        });

                        socket.on('vrDriveData', function (data) {
                            console.log(data);
                            initCarModel(data.model);
                            var _st = setTimeout(function(){
                                $("#"+data.color).trigger("click");
                            },500);
                        });

                        
                        
                    },
                    speak: function(text) {
                      // Create a new instance of SpeechSynthesisUtterance.
                      var utterance = new SpeechSynthesisUtterance(text);
                          utterance.lang = 'en-GB';
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