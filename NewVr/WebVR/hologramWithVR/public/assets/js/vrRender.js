var CARS = {

        "veyron":   {

          name: "Bugatti Veyron",
          url:  "/obj/VeyronNoUv.js",
          author: '<a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1129" target="_blank">Troyano</a>',
          init_rotation: [ 0, 0, 0 ],
          scale: 5.5,
          init_material: 4,
          body_materials: [ 2 ],

          object: null,
          buttons: null,
          materials: null

        },

        "gallardo": {

          name:   "Lamborghini Gallardo",
          url:  "/obj/GallardoNoUv.js",
          author: '<a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1711" target="_blank">machman_3d</a>',
          init_rotation: [ 0, 0, 0 ],
          scale: 3.7,
          init_material: 9,
          body_materials: [ 3 ],

          object: null,
          buttons: null,
          materials: null

        },

        "f50": {

          name:   "Ferrari F50",
          url:  "/obj/F50NoUv.js",
          author: '<a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1687" target="_blank">daniel sathya</a>',
          init_rotation: [ 0, 0, 0 ],
          scale: 0.175,
          init_material: 2,
          body_materials: [ 3, 6, 7, 8, 9, 10, 23, 24 ],

          object: null,
          buttons: null,
          materials: null

        },

        "camaro": {

          name:   "Chevrolet Camaro",
          url:  "/obj/CamaroNoUv.js",
          author: '<a href="http://www.turbosquid.com/3d-models/blender-camaro/411348" target="_blank">dskfnwn</a>',
          init_rotation: [ 0.0, 0.0, 0.0 /*0, 1, 0*/ ],
          scale: 75,
          init_material: 0,
          body_materials: [ 0 ],

          object: null,
          buttons: null,
          materials: null

        }

      };

    var camera, scene, renderer;

    var effect, controls;

    var element, container,renderedCar;

    var mouseX=0,mouseY=0;
      var group = new THREE.Object3D();//create an empty container
    
    
    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    init();
    animate();
    var r = "/assets/images/cars/";
        var urls = [ r + "posx.jpg", r + "negx.jpg",
               r + "posy.jpg", r + "negy.jpg",
               r + "posz.jpg", r + "negz.jpg" ];

        var textureCube = THREE.ImageUtils.loadTextureCube( urls );
        textureCube.format = THREE.RGBFormat;

        // common materials

        var mlib = {

        "Orange":   new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
        "Blue":   new THREE.MeshLambertMaterial( { color: 0x001133, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
        "Red":    new THREE.MeshLambertMaterial( { color: 0x660000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
        "Black":  new THREE.MeshLambertMaterial( { color: 0x000000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.15 } ),
        "White":  new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),

        "Carmine":  new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Gold":   new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Bronze": new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
        "Chrome":   new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, envMap: textureCube, combine: THREE.MultiplyOperation } ),

        "Orange metal": new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Blue metal":   new THREE.MeshLambertMaterial( { color: 0x001133, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Red metal":  new THREE.MeshLambertMaterial( { color: 0x770000, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Green metal":  new THREE.MeshLambertMaterial( { color: 0x007711, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Black metal":  new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube, combine: THREE.MultiplyOperation } ),

        "Pure chrome":  new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube } ),
        "Dark chrome":  new THREE.MeshLambertMaterial( { color: 0x444444, envMap: textureCube } ),
        "Darker chrome":new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube } ),

        "Black glass":  new THREE.MeshLambertMaterial( { color: 0x101016, envMap: textureCube, opacity: 0.975, transparent: true } ),
        "Dark glass": new THREE.MeshLambertMaterial( { color: 0x101046, envMap: textureCube, opacity: 0.25, transparent: true } ),
        "Blue glass": new THREE.MeshLambertMaterial( { color: 0x668899, envMap: textureCube, opacity: 0.75, transparent: true } ),
        "Light glass":  new THREE.MeshBasicMaterial( { color: 0x223344, envMap: textureCube, opacity: 0.25, transparent: true, combine: THREE.MixOperation, reflectivity: 0.25 } ),

        "Red glass":  new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
        "Yellow glass": new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
        "Orange glass": new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),

        "Orange glass 50":  new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
        "Red glass 50":   new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),

        "Fullblack rough":  new THREE.MeshLambertMaterial( { color: 0x000000 } ),
        "Black rough":    new THREE.MeshLambertMaterial( { color: 0x050505 } ),
        "Darkgray rough": new THREE.MeshLambertMaterial( { color: 0x090909 } ),
        "Red rough":    new THREE.MeshLambertMaterial( { color: 0x330500 } ),

        "Darkgray shiny": new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
        "Gray shiny":   new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } )

        }

        // Gallardo materials

        CARS[ "gallardo" ].materials = {

          body: [

            [ "Orange",   mlib[ "Orange" ] ],
            [ "Blue",     mlib[ "Blue" ] ],
            [ "Red",    mlib[ "Red" ] ],
            [ "Black",    mlib[ "Black" ] ],
            [ "White",    mlib[ "White" ] ],

            [ "Orange metal",   mlib[ "Orange metal" ] ],
            [ "Blue metal",   mlib[ "Blue metal" ] ],
            [ "Green metal",  mlib[ "Green metal" ] ],
            [ "Black metal",  mlib[ "Black metal" ] ],

            [ "Carmine",  mlib[ "Carmine" ] ],
            [ "Gold",     mlib[ "Gold" ] ],
            [ "Bronze",   mlib[ "Bronze" ] ],
            [ "Chrome",   mlib[ "Chrome" ] ]

          ]

        }

        m = CARS[ "gallardo" ].materials;
        mi = CARS[ "gallardo" ].init_material;

        CARS[ "gallardo" ].mmap = {

          0: mlib[ "Pure chrome" ],   // wheels chrome
          1: mlib[ "Black rough" ],   // tire
          2: mlib[ "Black glass" ],   // windshield
          3: m.body[ mi ][ 1 ],     // body
          4: mlib[ "Red glass" ],     // back lights
          5: mlib[ "Yellow glass" ],  // front lights
          6: mlib[ "Dark chrome" ]  // windshield rim

        }

        // Veyron materials

        CARS[ "veyron" ].materials = {

          body: [

            [ "Orange metal",   mlib[ "Orange metal" ] ],
            [ "Blue metal",   mlib[ "Blue metal" ] ],
            [ "Red metal",    mlib[ "Red metal" ] ],
            [ "Green metal",  mlib[ "Green metal" ] ],
            [ "Black metal",  mlib[ "Black metal" ] ],

            [ "Gold",     mlib[ "Gold" ] ],
            [ "Bronze",   mlib[ "Bronze" ] ],
            [ "Chrome",   mlib[ "Chrome" ] ]

          ],

        }

        m = CARS[ "veyron" ].materials;
        mi = CARS[ "veyron" ].init_material;

        CARS[ "veyron" ].mmap = {

          0: mlib[ "Black rough" ],   // tires + inside
          1: mlib[ "Pure chrome" ],   // wheels + extras chrome
          2: m.body[ mi ][ 1 ],       // back / top / front torso
          3: mlib[ "Dark glass" ],    // glass
          4: mlib[ "Pure chrome" ],   // sides torso
          5: mlib[ "Pure chrome" ],   // engine
          6: mlib[ "Red glass 50" ],    // backlights
          7: mlib[ "Orange glass 50" ]  // backsignals

        }

        // F50 materials

        CARS[ "f50" ].materials = {

          body: [

            [ "Orange",   mlib[ "Orange" ] ],
            [ "Blue",     mlib[ "Blue" ] ],
            [ "Red",    mlib[ "Red" ] ],
            [ "Black",    mlib[ "Black" ] ],
            [ "White",    mlib[ "White" ] ],

            [ "Orange metal",   mlib[ "Orange metal" ] ],
            [ "Blue metal",   mlib[ "Blue metal" ] ],
            [ "Black metal",  mlib[ "Black metal" ] ],

            [ "Carmine",  mlib[ "Carmine" ] ],
            [ "Gold",     mlib[ "Gold" ] ],
            [ "Bronze",   mlib[ "Bronze" ] ],
            [ "Chrome",   mlib[ "Chrome" ] ]

          ],

        }

        m = CARS[ "f50" ].materials;
        mi = CARS[ "f50" ].init_material;

        CARS[ "f50" ].mmap = {

          0:  mlib[ "Dark chrome" ],    // interior + rim
          1:  mlib[ "Pure chrome" ],    // wheels + gears chrome
          2:  mlib[ "Blue glass" ],     // glass
          3:  m.body[ mi ][ 1 ],      // torso mid + front spoiler
          4:  mlib[ "Darkgray shiny" ],   // interior + behind seats
          5:  mlib[ "Darkgray shiny" ],   // tiny dots in interior
          6:  m.body[ mi ][ 1 ],      // back torso
          7:  m.body[ mi ][ 1 ],      // right mirror decal
          8:  m.body[ mi ][ 1 ],      // front decal
          9:  m.body[ mi ][ 1 ],      // front torso
          10: m.body[ mi ][ 1 ],      // left mirror decal
          11: mlib[ "Pure chrome" ],    // engine
          12: mlib[ "Darkgray rough" ], // tires side
          13: mlib[ "Darkgray rough" ], // tires bottom
          14: mlib[ "Darkgray shiny" ],   // bottom
          15: mlib[ "Black rough" ],    // ???
          16: mlib[ "Orange glass" ],   // front signals
          17: mlib[ "Dark chrome" ],    // wheels center
          18: mlib[ "Red glass" ],    // back lights
          19: mlib[ "Black rough" ],    // ???
          20: mlib[ "Red rough" ],    // seats
          21: mlib[ "Black rough" ],    // back plate
          22: mlib[ "Black rough" ],    // front light dots
          23: m.body[ mi ][ 1 ],      // back torso
          24: m.body[ mi ][ 1 ]       // back torso center

        }


        // Camero materials

        CARS[ "camaro" ].materials = {

          body: [

            [ "Orange",   mlib[ "Orange" ] ],
            [ "Blue",     mlib[ "Blue" ] ],
            [ "Red",    mlib[ "Red" ] ],
            [ "Black",    mlib[ "Black" ] ],
            [ "White",    mlib[ "White" ] ],

            [ "Orange metal",   mlib[ "Orange metal" ] ],
            [ "Blue metal",   mlib[ "Blue metal" ] ],
            [ "Red metal",    mlib[ "Red metal" ] ],
            [ "Green metal",  mlib[ "Green metal" ] ],
            [ "Black metal",  mlib[ "Black metal" ] ],

            [ "Gold",     mlib[ "Gold" ] ],
            [ "Bronze",   mlib[ "Bronze" ] ],
            [ "Chrome",   mlib[ "Chrome" ] ]

          ],

        }

        m = CARS[ "camaro" ].materials;
        mi = CARS[ "camaro" ].init_material;

        CARS[ "camaro" ].mmap = {

          0: m.body[ mi ][ 1 ],       // car body
          1: mlib[ "Pure chrome" ],     // wheels chrome
          2: mlib[ "Pure chrome" ],     // grille chrome
          3: mlib[ "Dark chrome" ],     // door lines
          4: mlib[ "Light glass" ],     // windshield
          5: mlib[ "Gray shiny" ],        // interior
          6: mlib[ "Black rough" ],       // tire
          7: mlib[ "Fullblack rough" ],   // tireling
          8: mlib[ "Fullblack rough" ]    // behind grille

        }
        function switchCar( car ) {

        for ( var c in CARS ) {

          if ( c != car && CARS[ c ].object ) {

            CARS[ c ].object.visible = false;
            CARS[ c ].buttons.style.display = "none";

          }
        }

        CARS[ car ].object.visible = true;
        CARS[ car ].buttons.style.display = "block";

        $( "#car_name" ).innerHTML = CARS[ car ].name + " model";
        $( "#car_author" ).innerHTML = CARS[ car ].author;

      }
      function button_name( car, index ) { return "m_" + car  + "_" + index }

        //loader.load( CARS[ "veyron" ].url, function( geometry ) { createScene( geometry, "veyron" ) } );

        // for( var c in CARS ) initCarButton( c );

   var loader =  new THREE.BinaryLoader( true );
    function init() {

      // Setting up the WebGL renderer
      renderer = new THREE.WebGLRenderer();
      
      element = renderer.domElement;

      container = document.getElementById('carCanvas');

      container.appendChild(element);

      // Setting up the Stereo Effect on renderer
      effect = new THREE.StereoEffect(renderer);

      // creating new scene
      scene = new THREE.Scene();

      var axis = new THREE.AxisHelper(10);
      scene.add(axis);

      var color = new THREE.Color("rgb(255,0,0)");
  
      var grid = new THREE.GridHelper(30,10,color)
      scene.add(grid);

      // Setting up camera 
      camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH/SCREEN_HEIGHT, 1, 3000);
      
      // setting init camera position
      camera.position.set(600, 10, 400);


      //adding camera to scene
      scene.add(camera);

      // Loading our 3D model json
   

          
      

      // Setting orbit controls for moving about the scene
      controls = new THREE.OrbitControls(camera, element);
      
      controls.noZoom = true;
      controls.noPan = true;

      // setting the Device Orientation Controls
      function setOrientationControls(e) {
        if (!e.alpha) {
          return;
        }

        // Passing 3D model to render accroding to device orientation
        controls = new THREE.DeviceOrientationControls(renderedCar, true);
        controls.connect();
        controls.update();

        window.removeEventListener('deviceorientation', setOrientationControls, true);
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);

      var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
      scene.add(light);
      
      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);
    }


    // On resize updating camera aspect
    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

      camera.aspect = width / height;
      // camera.updateProjectionMatrix();

      // renderer.setSize(width, height);
      // effect.setSize(width, height);
    }

    function update(dt) {

      resize();

      camera.updateProjectionMatrix();

      controls.update(dt);
    }

    function render() {
      effect.render(scene, camera);
    }

    function animate() {
      requestAnimationFrame(animate);
      update();
      render();
    }

function toggleFullscreen(elem) {
  elem = elem || document.documentElement;
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

  // document.getElementById('btnFullscreen').addEventListener('click', function() {
  //   toggleFullscreen();
  // });

  // document.getElementById('container').addEventListener('click', function() {
  //   toggleFullscreen(this);
  // });
function createScene( geometry, car ) {

        loader.statusDomElement.innerHTML = "Creating model ...";

        var m = new THREE.MeshFaceMaterial(),
          s = CARS[ car ].scale * 1,
          r = CARS[ car ].init_rotation,
          materials = CARS[ car ].materials,
          mi = CARS[ car ].init_material,
          bm = CARS[ car ].body_materials;

        for ( var i in CARS[ car ].mmap ) {

          m.materials[ i ] = CARS[ car ].mmap[ i ];

        }

        var mesh = new THREE.Mesh( geometry, m );

        mesh.rotation.x = r[ 0 ];
        mesh.rotation.y = r[ 1 ];
        mesh.rotation.z = r[ 2 ];

        mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
        mesh.rotation.y = 180 * Math.PI / 180;
        
        group.add( mesh );
        scene.add( group );

        CARS[ car ].object = mesh;

        CARS[ car ].buttons = createButtons( materials.body, car );
        attachButtonMaterials( materials.body, m, bm, car );
        switchCar( car );

        loader.statusDomElement.style.display = "none";
        loader.statusDomElement.innerHTML = "Loading model ...";

      }
function createButtons( materials, car ) {

        var buttons, i, src = "";

        for( i = 0; i < materials.length; i ++ ) {

          src += '<button id="' + button_name( car, i ) + '">' + materials[ i ][ 0 ] + '</button> ';

        }

        buttons = document.createElement( "div" );
        buttons.innerHTML = src;

        document.getElementById( "buttons_materials" ).appendChild( buttons );

        return buttons;

      }

      function attachButtonMaterials( materials, faceMaterial, material_indices, car ) {

        for( var i = 0; i < materials.length; i ++ ) {
          document.getElementById( button_name( car, i ) ).counter = i;
          document.getElementById( button_name( car, i ) ).addEventListener( 'click', function() {
            for ( var j = 0; j < material_indices.length; j ++ ) {

              faceMaterial.materials[ material_indices [ j ] ] = materials[ this.counter ][ 1 ];

            }

          }, false );

        }

      }
function initCarModel( car ) {
          if ( ! CARS[ car ].object ) {
           

            loader.load( CARS[ car ].url, function( carModel ) { 
               loader.load( CARS[ car ].url, function( geometry ) { createScene( geometry, car ) } );

                
                // adding our 3d model to scene
                // scene.add( renderedCar );

            });

          } else {

            switchCar( car );

          }

      }


