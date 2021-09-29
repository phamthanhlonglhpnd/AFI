const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


// header.js
const icon = $(".header-icon");
const headerMobile = $(".header-mobile");
const Close = $(".close");
const overlay1 = $(".overlay1");
const header = $(".header");

icon.onclick = () => {
    headerMobile.style.transform = "translateX(0)";
    overlay1.style.opacity = 1;
    overlay1.style.zIndex = 1;
}

Close.onclick = () => {
    headerMobile.style.transform = "translateX(100%)";
    overlay1.style.opacity = 0;
    overlay1.style.zIndex = -1;
}

overlay1.onclick = () => {
    headerMobile.style.transform = "translateX(100%)";
    overlay1.style.opacity = 0;
    overlay1.style.zIndex = -1;
}

// button to top
const toTop = $(".copy-top");
toTop.onclick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// intro.js
const parallaxAnimate = $(".two");
parallaxAnimate.animate([
    {transform: "rotate(360deg)"},
], {
    duration: 25000,
    iterations: Infinity
})

// text effect function
// var textContent = $(".textcontent");
// const arrText = ["Nguồn lực Công nghệ thông tin", "Giải pháp Công nghệ thông tin", "Hệ thống Công nghệ thông tin"];
// let count = 0; 
// let index = 0;
// let currentText = "";
// let letter = "";

// (function textEffect() {
//     if(count === arrText.length) {
//         count = 0;
//     }

//     currentText = arrText[count];
//     letter = currentText.slice(0, ++index);
//     textContent.innerHTML = letter;

//     if(letter.length === currentText.length) {
//         count++;
//         index = 0;
//     }
//     setTimeout(textEffect, 80);
// })();

// intro.js
const textEffect = function(textContent, arrWord, timer) {
    this.textContent = textContent;
    this.timer = parseInt(timer, 10);
    this.arrWord = arrWord;
    this.word = "";
    this.currentIndex = 0;
    this.isDeleteWord = false;
    this.textEffectFunc();
}

document.addEventListener("DOMContentLoaded", runTextEffect);
document.addEventListener("DOMContentLoaded", runParallaxEffect);
function runTextEffect() {
    const textContent = $(".textcontent");
    const arrWord = JSON.parse(textContent.getAttribute("data-arrWord"));
    const timer = textContent.getAttribute("data-timer");
    new textEffect(textContent, arrWord, timer);
}

function runParallaxEffect() {
    const parallaxContent = $(".one");
    const arrWord = JSON.parse(parallaxContent.getAttribute("data-arrWord"));
    const timer = parallaxContent.getAttribute("data-timer");
    new textEffect(parallaxContent, arrWord, timer);
}

textEffect.prototype.textEffectFunc = function() {
    const currentIndexWord = this.currentIndex % this.arrWord.length;
    const currentWord = this.arrWord[currentIndexWord];
    
    if(this.isDeleteWord) {
        this.word = currentWord.substring(0, this.word.length-1)
    } else {
        this.word = currentWord.substring(0, this.word.length+1)
    }
    this.textContent.innerHTML = this.word;
    let timerDeleteWord = 50;
    if(this.isDeleteWord) {
        timerDeleteWord = timerDeleteWord/2;
    }
    if(!this.isDeleteWord && this.word === currentWord) {
        timerDeleteWord = this.timer;
        this.isDeleteWord = true;
    }
    else if(this.isDeleteWord && this.word === "") {
        timerDeleteWord = 50;
        this.isDeleteWord = false;
        this.currentIndex++;
    }
    setTimeout(() => this.textEffectFunc(), timerDeleteWord);
}

const image1 = $(".intro-image1");
const image2 = $(".intro-image2");
window.onscroll = () => {
    if(document.body.scrollTop > image1.offsetHeight || document.documentElement.scrollTop > image1.offsetHeight) {
        image1.style.transform = "translateX(100px)";
        image2.style.transform = "translateX(500px)";
        image2.style.opacity = 0;
    }
    else {
        image1.style.transform = "translateX(0)";
        image2.style.transform = "translateX(0)";
        image2.style.opacity = 1;
    }
    if(document.body.scrollTop > header.clientHeight || document.documentElement.scrollTop > header.clientHeight) {
        toTop.style.display = "block";
        header.classList.add("sticky");   
    }
    else {
        toTop.style.display = "none";
        header.classList.remove("sticky");
    }
}

// experience.js // action.js
const rate = $$(".experience-rate");
const rateNumber = $$(".experience-number");

const numberProjects = $$(".action-number");
const speed = 100;

window.onload = () => {
    numberProjects.forEach(number => {
        const animate = () => {
            const value = +number.getAttribute("data-number");
            const data = +number.innerText;
            const time = value/speed;
            if(data<value) {
                number.innerText = Math.ceil(data + time);
                setTimeout(animate, 0.5);
            }
            else {
                number.innerHTML = value;
            }
        }
        animate();
    })
    var flag = false;
    (function move() {
        if(!flag) {
            flag = true;
            var id = setInterval(run, 10);
            var width = 0;
            function run() {
                if(width>85) {
                    flag = false; 
                    clearInterval(id);
                }
                else {
                    width++;
                    rate.forEach(item => {
                        item.style.width = width + "%";
                    })
                    rateNumber.forEach(item => {
                        item.innerText = width + "%"
                    })
                }
            }
    
        }
    })()
}

// image.js
const imageList = $$(".image-item img");
Array.from(imageList).map(image => image.addEventListener("click", handleZoom));
function handleZoom(e) {
    let imageSrc;
    imageSrc = e.target.getAttribute("src");
    const template = `
        <div class="overlay2">
            <div class="overlay-content">
                <span class="overlay-prev">
                    <i class="fas fa-chevron-left"></i>
                </span> 
                <img src="${imageSrc}" alt="" class="overlay-image">   
                <span class="overlay-next">
                    <i class="fas fa-chevron-right"></i>
                </span> 
            </div>
        </div> `
    document.body.insertAdjacentHTML("beforeend", template);
}
let index = 0;
document.body.addEventListener("click", (e) => {
    const arrImage = [...imageList];
    let image = $(".overlay-image");
    let imageSrc = "";
    if(e.target.matches(".overlay2")) {
        e.target.remove();
    }
    if(e.target.matches(".overlay-next")) {
        imageSrc = image.getAttribute("src");
        index = arrImage.findIndex(item => item.getAttribute("src") === imageSrc);
        index++;
        if(index > arrImage.length - 1) {
            index = 0;
        }
        const newSrc = arrImage[index].getAttribute("src");
        image.setAttribute("src", newSrc);
    }
    if(e.target.matches(".overlay-prev")) {
        imageSrc = image.getAttribute("src");
        index = arrImage.findIndex(item => item.getAttribute("src") === imageSrc);
        index--;
        if(index < 0) {
            index = arrImage.length -1;
        }
        const newSrc = arrImage[index].getAttribute("src");
        image.setAttribute("src", newSrc);
    }
})