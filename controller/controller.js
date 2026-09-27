const socket=io();

const state={

x:0,
accel:false,
brake:false

};

join.onclick=()=>{

socket.emit("join-controller",name.value);

pad.style.display="block";

};

steer.oninput=e=>{

state.x=parseFloat(e.target.value);

socket.emit("input",state);

};

gas.onpointerdown=()=>{

state.accel=true;
socket.emit("input",state);

};

gas.onpointerup=()=>{

state.accel=false;
socket.emit("input",state);

};

brake.onpointerdown=()=>{

state.brake=true;
socket.emit("input",state);

};

brake.onpointerup=()=>{

state.brake=false;
socket.emit("input",state);

};

pad.style.display="none";
