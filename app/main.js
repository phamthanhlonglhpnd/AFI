import { textEffect } from "./_intro";
const textContent = $(".textcontent");
const arrWord = JSON.parse(textContent.getAttribute("data-arrWord"));
const timer = textContent.getAttribute("data-timer");
textEffect(textContent, arrWord, timer);