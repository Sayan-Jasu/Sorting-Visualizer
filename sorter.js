const n = 20;
const array = [];

let audio = null;

function play(freq) {
    if (audio == null) audio = new(
        AudioContext || webkitAudioContext || window.webkitAudioContext
    )();
    const dur = 0.2;
    const osc = audio.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audio.currentTime + dur);
    const note = audio.createGain();
    note.gain.value = 0.5;
    note.gain.linearRampToValueAtTime(
        0, audio.currentTime + dur
    );
    osc.connect(note);
    note.connect(audio.destination);
}

function init() {
    for (let i = 0; i < n; i++) array[i] = Math.random();
    showbars();
}

function bubble() {
    const copy = [...array];
    const swaps = bubblesort(copy);
    animate(swaps);
}

function showbars(swap) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (swap && swap.indices.includes(i)) {
            bar.style.backgroundColor = (swap.type == "swap" ? "red" : "orange");
        };
        container.appendChild(bar);
    }
}

function animate(swaps) {
    if (swaps.length == 0) {
        showbars();
        return;
    }
    const swap = swaps.shift();
    const [i, j] = swap.indices;
    if (swap.type == "swap")[array[i], array[j]] = [array[j], array[i]];
    play(270 + array[i] * 230);
    play(270 + array[j] * 230);
    showbars(swap);
    setTimeout(function() {
        animate(swaps);
    }, 100);
}

function bubblesort(array) {
    const swaps = [];
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            // swaps.push({
            //     indices: [i - 1, i],
            //     type: "comp"
            // });
            if (array[i - 1] > array[i]) {
                swapped = true;
                swaps.push({
                    indices: [i - 1, i],
                    type: "swap"
                });
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
        }
    } while (swapped);
    return swaps;
}