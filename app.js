const app = document.querySelector(".app");
const container = document.querySelector(".container");
const hot100 = document.querySelector(".hot100");
const infinite = document.querySelector(".infinite");
const challenge = document.querySelector(".challenge");
const restart = document.querySelector(".restart");
const score = document.querySelector(".score");



let count;

const addCounter = () => {
    const counter = document.createElement("div");
    container.insertBefore(counter, container.firstElementChild);
    counter.classList.add("counter");
    counter.addEventListener("click", addSticks);
}

const disableCounter = (counter) => {
    counter.removeEventListener("click", addSticks);
    counter.classList.remove("counter");
    counter.classList.add("oldCounter");
}

const addSticks = (e) => {
    if(e.target.matches(".counter")) {
        count++;
        localStorage.setItem("count", count); 
        const stick = document.createElement("div");
        stick.classList.add("stick");
        e.target.appendChild(stick);
    }
};

const addPlaneSticks = (num, counter) => {
    for(let i = 1; i <= num; i++) {
        const stick = document.createElement("div");
        stick.classList.add("stick");
        counter.appendChild(stick);
    }
}

const handleCounter = (e) => {
    if(count%5 === 0 && e.target.matches(".counter")) {
        const counters = document.getElementsByClassName("counter");
        console.log(counters);
        if(counters.length > 0) disableCounter(counters[counters.length-1]);
        addCounter();
    }
    
}

const handleLoad = () => {
    count = localStorage.getItem("count");
    console.log(count);
    for(let i = count; i >= 0; i-=5) {
        const counter = document.createElement("div");
        if(i < 5) {
            counter.classList.add("counter");
            counter.addEventListener("click", addSticks);
            addPlaneSticks(i, counter);
        } else {
            counter.classList.add("oldCounter");
            addPlaneSticks(5, counter);
        }
        container.insertBefore(counter, container.firstChild);
    }
    
}

const handleRestart = () => {
    container.innerHTML = "";
    addCounter();
    count = 0;
    localStorage.setItem("count", count);
}



window.addEventListener("load", handleLoad);
container.addEventListener("click", handleCounter);
restart.addEventListener("click", handleRestart);

