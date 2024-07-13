const n = 20;
const array = [];

init();
//populate the array
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
            if(array[i-1] > array[i]){
                swapped = true;
                moves.push([i-1, i]);
                [array[i-1], array[i]] = [array[i], array[i-1]];
                
            }
        }
    }while (swapped);
    return moves;
}


function showbars(indeces){
    container.innerHTML ="";
    for(let i = 0; i < n; i++){
        // const barLabel = document.createElement("p");
        // barLabel.textContent = array[i];
        // barLabel.
        // container.appendChild(barLabel);
        const bar = document.createElement("div");
        bar.style.height = array[i]+"%";
        bar.classList.add("bar");

        if(indeces && indeces.includes(i)){
            bar.style.backgroundColor = "red";
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
    const [i,j] = moves.shift();
    [array[i],array[j]] = [array[j], array[i]];
    showbars([i,j]);
    setTimeout(()=>{
        animate(moves);
    },1000)
}