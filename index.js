const n = 20;
const array = [];

init();
//populate the array

let audioCtx = null;

function playNote(freq){
    if(audioCtx === null){
        audioCtx = new (
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + dur);

    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
    osc.connect(node);
    node.connect(audioCtx.destination);

}

function init(){
    for(let i = 0; i < n; i++){
        array[i] = Math.floor(Math.random()*100);
    }
    showbars();
}


//bubble sort
function bubbleSort(array){
    let swapped;
    const moves = [];
    do{
        swapped = false;
        for (let i = 1; i < array.length; i++){
            moves.push({indeces:[i-1, i],type:"comp"});
            if(array[i-1] > array[i]){
                swapped = true;
                moves.push({indeces:[i-1, i],type:"swap"});
                [array[i-1], array[i]] = [array[i], array[i-1]];
                
            }
        }
    }while (swapped);
    return moves;
}


function showbars(move){
    container.innerHTML ="";
    for(let i = 0; i < n; i++){
        // const barLabel = document.createElement("p");
        // barLabel.textContent = array[i];
        // barLabel.
        // container.appendChild(barLabel);
        const bar = document.createElement("div");
        bar.style.height = array[i]+"%";
        bar.classList.add("bar");

        if(move && move.indeces.includes(i)){
            bar.style.backgroundColor = 
                move.type === "swap" ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}

function play(){
    const copy = [...array];
    const moves = bubbleSort(copy);
    animate(moves);
}

function animate(moves){
    if(moves.length === 0){
        showbars();
        return;
    }
    const move = moves.shift();
    const [i,j] = move.indeces;
    
    if(move.type === "swap"){
        [array[i],array[j]] = [array[j], array[i]];
    }

    playNote(200 + array [i] * 5);
    playNote(200 + array [j] * 5);
    showbars(move);
    setTimeout(()=>{
        animate(moves);
    },100)
}