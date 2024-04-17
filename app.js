const app = document.querySelector(".app");
const container = document.querySelector(".container");


let count = 0;

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
        localStorage.setItem("count", JSON.stringify(count)); 
        const stick = document.createElement("div");
        stick.classList.add("stick");
        e.target.appendChild(stick);
    }
};

const handleCounter = (e) => {
    if(count === 0) {
        addCounter();
        return;
    }
    if(count%5 === 0 && e.target.matches(".counter")) {
        console.log(count);
        const counters = document.getElementsByClassName("counter");
        console.log(counters);
        if(counters.length > 0) disableCounter(counters[counters.length-1]);
        addCounter();
    }
    
}





container.addEventListener("click", handleCounter);
window.addEventListener("load", handleCounter);


console.log(container);