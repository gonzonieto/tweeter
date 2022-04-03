$(document).ready(function() {
  const style = getComputedStyle(document.body);

  $("#tweet-text").on("input", function(e) {
    const counter = this.nextElementSibling;
    const charCount = 140 - this.value.length;
    counter.value = charCount;

    if (charCount < 0)   counter.style.color = style.getPropertyValue('--pink').trim(); else
    if (charCount < 20)  counter.style.color = style.getPropertyValue('--yellow').trim(); else
    if (charCount >= 20) counter.style.color = style.getPropertyValue('--brown').trim();
  });
});
