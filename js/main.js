var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(85,window.innerWidth/window.innerHeight,0.1,1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0x000000);

document.body.appendChild(renderer.domElement);


window.addEventListener('resize',function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

//controls = new THREE.OrbitControls(camera,renderer.domElement);

//creeating the shape
var geometry = new THREE.BoxGeometry(1,1,1);

var cubeMaterials = [
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/two.png'), side:THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/five.png'), side:THREE.DoubleSide }),

    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/three.png'), side:THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/four.png'), side:THREE.DoubleSide }),
    
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/one.png'), side:THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/six.png'), side:THREE.DoubleSide }),
];

//creating a material , color or image texture
var basicMaterial = new THREE.MeshBasicMaterial({color:0xffffff,wireframe:false,});

var material = new THREE.MeshFaceMaterial(cubeMaterials);

var cube = new THREE.Mesh(geometry,material);

scene.add(cube);

camera.position.z = 3;


var isRotating  = false;
var resultAfterRotation = 0;

//Game Logic
var update = function (){
    if(isRotating){
        cube.rotation.x += (Math.random()*.2)+.1;
        cube.rotation.y += (Math.random()*.2)+.1;
    }
};

//Draw Scene
var render = function (){
    renderer.render(scene,camera)
};

//Run Game Loop, update , render , repeat
var GameLoop = function(){
    requestAnimationFrame(GameLoop);
    update();
    render();
};

GameLoop();



document.onclick = function(){
    resultAfterRotation = Math.floor((Math.random()*6)) + 1;
    isRotating = true;
    document.getElementById('currentText').innerHTML ="Checking Your Luck";
    console.log(resultAfterRotation);
    myVar = setTimeout(function(){
        isRotating = false;
        rotateTo(resultAfterRotation);
        document.getElementById('currentText').innerHTML = resultAfterRotation;
    }, (Math.random()* 3000)+500);
    //clearTimeout(myVar);
};


var rotateTo = function(faceNo){
    switch (faceNo) {
        case 1:
            cube.rotation.x = 0;
            cube.rotation.y = degToRadians(0);
            break;
        case 2:
            cube.rotation.x = 0;
            cube.rotation.y = degToRadians(-90);
            break;
        case 3: 
            cube.rotation.x = degToRadians(90);
            cube.rotation.y = 0;
            break;
        case 4:
            cube.rotation.x = degToRadians(-90);
            cube.rotation.y = 0;
            break;
        case 5:
            cube.rotation.x = 0;
            cube.rotation.y = degToRadians(90);   
            break;
        case 6:
            cube.rotation.x = 0;
            cube.rotation.y = degToRadians(180);  
            break;
        default:
            break;
    }
}

var degToRadians = function(deg){
    return (Math.PI*deg)/180;
}




/*

1 -> 0,0
2-> 0,-90
3->90,0
4->-90,0
5-> 0, 90
6 -> 0,180



*/