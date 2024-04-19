const app = document.querySelector(".app");
const container = document.querySelector(".container");
const hot100 = document.querySelector(".hot100");
const infinite = document.querySelector(".infinite");
const challenge = document.querySelector(".challenge");
const restart = document.querySelector(".restart");
const score = document.querySelector(".score");



let hot100Count, infiniteCount, challengeCounts, mode;

const addCounter = () => {
    const counter = document.createElement("div");
    if(mode === "infinite") container.insertBefore(counter, container.firstElementChild);
    else container.appendChild(counter);
    
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
        if(mode == "hot100") {
            hot100Count++;
            localStorage.setItem("hot100", hot100Count);
        } else if(mode == "infinite") {
            infiniteCount++;
            localStorage.setItem("infinite", infiniteCount);
        }
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
    let count;
    if(mode == "infinite") count = infiniteCount;
    else if(mode == "hot100") count = hot100Count;
    if(count%5 === 0 && e.target.matches(".counter")) {
        const counters = document.getElementsByClassName("counter");
        if(mode == "infinite") disableCounter(counters[0]);
        else if(mode == "hot100") disableCounter(counters[counters.length-1]);
        addCounter();
    }
    
}

const handleLoad = () => {
    container.innerHTML="";
    hot100Count = localStorage.getItem("hot100");
    if(hot100Count == null) {
        hot100Count = 0;
        localStorage.setItem("hot100", hot100Count);
    }
    infiniteCount = localStorage.getItem("infinite");
    if(infiniteCount == null) {
        infiniteCount = 0;
        localStorage.setItem("infinite", infiniteCount);
    }
    challengeCounts = JSON.parse(localStorage.getItem("challenge"));
    mode = localStorage.getItem("mode");
    if(mode == null) {
        mode = "hot100";
        localStorage.setItem("mode", mode);
    }
    if(mode === "challenge") handleChallengeLoad();
    else if(mode === "infinite") handleInfiniteLoad();
    else handleHot100Load(); 
}

const handleHot100Load = () => {
    for(let i = hot100Count; i >= 0; i-=5) {
        const counter = document.createElement("div");
        if(i < 5) {
            counter.classList.add("counter");
            counter.addEventListener("click", addSticks);
            addPlaneSticks(i, counter);
        } else {
            counter.classList.add("oldCounter");
            addPlaneSticks(5, counter);
        }
        container.appendChild(counter);
    }
}

const handleInfiniteLoad = () => {
    for(let i = infiniteCount; i >= 0; i-=5) {
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

const handleChallengeLoad = () => {
    const scoreA = challengeCounts.scoreA;
    const scoreB = challengeCounts.scoreB;
}


const handleRestart = () => {
    if(mode === "hot100") {
        hot100Count = 0;
        localStorage.setItem("hot100", hot100Count);
    } 
    else if(mode === "infinite") {
        infiniteCount = 0;
        localStorage.setItem("infinite", infiniteCount);
    }
    else {
        // Challenge
    }
    handleLoad();
}



window.addEventListener("load", handleLoad);
container.addEventListener("click", handleCounter);
restart.addEventListener("click", handleRestart);
hot100.addEventListener("click", () => {
    if(mode !== "hot100") {
        mode = "hot100";
        localStorage.setItem("mode", mode);
        handleLoad();
    }
});
infinite.addEventListener("click", () => {
    if(mode !== "infinite") {
        mode = "infinite";
        localStorage.setItem("mode", mode);
        handleLoad();
    } 
});
challenge.addEventListener("click", handleChallengeLoad);
