import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

const socket=io();

const scene=new THREE.Scene();

scene.background=new THREE.Color(0x6ecbff);

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer=new THREE.WebGLRenderer({
canvas:document.getElementById("game"),
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

const light=new THREE.DirectionalLight(0xffffff,3);

light.position.set(5,10,5);

scene.add(light);

const ground=new THREE.Mesh(

new THREE.PlaneGeometry(300,300),

new THREE.MeshStandardMaterial({
color:0x3ea043
})

);

ground.rotation.x=-Math.PI/2;

scene.add(ground);

const kart=new THREE.Mesh(

new THREE.BoxGeometry(1.5,0.6,2.5),

new THREE.MeshStandardMaterial({
color:0xff3030
})

);

kart.position.y=.3;

scene.add(kart);

camera.position.set(0,4,-7);

let speed=0;

let steer=0;

document.getElementById("play").onclick=()=>{

document.getElementById("menu").style.display="none";

};

socket.on("players",list=>{

const div=document.getElementById("players");

div.innerHTML="";

const ids=Object.keys(list);

if(ids.length>0){

const p=list[ids[0]];

steer=p.x;

if(p.accel) speed+=0.05;
else speed*=0.98;

if(p.brake) speed-=0.04;

}

ids.forEach(id=>{

div.innerHTML+=`${list[id].name}<br>`;

});

});

function animate(){

requestAnimationFrame(animate);

kart.rotation.y-=steer*0.03;

kart.position.x+=Math.sin(kart.rotation.y)*speed;

kart.position.z+=Math.cos(kart.rotation.y)*speed;

camera.position.x=kart.position.x;

camera.position.z=kart.position.z-7;

camera.lookAt(kart.position);

document.getElementById("speed").innerText=
Math.abs(speed*120).toFixed(0)+" KM/H";

renderer.render(scene,camera);

}

animate();
