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

function runTextEffect() {
    const textContent = $(".textcontent");
    const arrWord = JSON.parse(textContent.getAttribute("data-arrWord"));
    const timer = textContent.getAttribute("data-timer");
    new textEffect(textContent, arrWord, timer);
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

export {textEffect};
