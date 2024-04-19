const app = document.querySelector(".app");
const container = document.querySelector(".container");
const hot100 = document.querySelector(".hot100");
const infinite = document.querySelector(".infinite");
const challenge = document.querySelector(".challenge");
const restart = document.querySelector(".restart");
const score = document.querySelector(".score");



let hot100Count, infiniteCount, challengeCounts, mode;

const addCounter = (cont) => {
    const counter = document.createElement("div");
    if(mode === "infinite") cont.insertBefore(counter, container.firstElementChild);
    else cont.appendChild(counter);
    
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
        } else {
            if(e.target.parentElement.getAttribute("id") == "cc1") challengeCounts.scoreA++;
            else challengeCounts.scoreB++;
            localStorage.setItem("challenge", JSON.stringify(challengeCounts));
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
    let count, cont = container;
    if(e.target.matches(".counter")) {
        if(mode == "infinite") count = infiniteCount;
        else if(mode == "hot100") count = hot100Count;
        else {
            if(e.target.parentElement.getAttribute("id") == "cc1") {
                console.log("player A");
                count = challengeCounts.scoreA;
                cont = document.querySelector("#cc1");
            } else {
                console.log("player B");
                count = challengeCounts.scoreB;
                cont = document.querySelector("#cc2");
            }
        }
        if(count%5 === 0) {
            const counters = cont.getElementsByClassName("counter");
            if(mode == "infinite") disableCounter(counters[0]);
            else disableCounter(counters[counters.length-1]);
            addCounter(cont);
        }
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
    if(challengeCounts == null) {
        challengeCounts = {};
        challengeCounts.target=20;
        challengeCounts.scoreA=0;
        challengeCounts.scoreB=0;
        localStorage.setItem("challenge", JSON.stringify(challengeCounts));
    }
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
    const conA = document.createElement("div");
    conA.classList.add("challengeContainer");
    conA.setAttribute("id", "cc1");
    container.appendChild(conA);
    const conB = document.createElement("div");
    container.appendChild(conB);
    conB.classList.add("challengeContainer");
    conB.setAttribute("id", "cc2");
    for(let i = scoreA; i >= 0; i-=5) {
        const counter = document.createElement("div");
        if(i < 5) {
            counter.classList.add("counter");
            counter.addEventListener("click", addSticks);
            addPlaneSticks(i, counter);
        } else {
            counter.classList.add("oldCounter");
            addPlaneSticks(5, counter);
        }
        conA.appendChild(counter);
    }
    for(let i = scoreB; i >= 0; i-=5) {
        const counter = document.createElement("div");
        if(i < 5) {
            counter.classList.add("counter");
            counter.addEventListener("click", addSticks);
            addPlaneSticks(i, counter);
        } else {
            counter.classList.add("oldCounter");
            addPlaneSticks(5, counter);
        }
        conB.appendChild(counter);
    }
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
        challengeCounts.target=20;
        challengeCounts.scoreA=0;
        challengeCounts.scoreB=0;
        localStorage.setItem("challenge", JSON.stringify(challengeCounts));
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
challenge.addEventListener("click", () => {
    if(mode !== "challenge") {
        mode = "challenge";
        localStorage.setItem("mode", mode);
        handleLoad();
    }
});
