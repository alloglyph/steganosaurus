function formatText(text) {
  var words = text.split(" ");
  const plaintext = document.getElementById('plaintext-composer').textContent.toLocaleLowerCase().replace(/[^a-z]/g, '');
  const codepoints = plaintext.split("").map(function (char) { return (char.charCodeAt(0) - 97); });
  var numbers = []
  codepoints.forEach(function (codepoint) {
    for (i = 5; i > -1; i--) {
      numbers.push((Math.pow(2, i) & codepoint) / Math.pow(2, i));
    }
  })

  var formattedWords = [];
  for (i=0; i<Math.min(words.length, numbers.length); i++) {
    var word = words[i]
    var bareword = word.toLocaleLowerCase().replace(/[^a-z]/g, '')
    if ((bareword.length % 2) == numbers[i]) {
      formattedWords.push("<span class='match'>" + word + "</span>");
    } else {
      formattedWords.push("<span class='miss'>" + word + "</span>");
    }
    if (!((i + 1) % 6)) {
      formattedWords.push("||");
    }
  }

  if (words.length < numbers.length) {
    formattedWords.push("  " + (numbers.length - words.length));
  }
  return formattedWords.join(" ");
}


document.getElementById('stegotext-composer').addEventListener('input', function(event) {
  document.getElementById('stegotext-display').innerHTML = formatText(event.target.textContent)
});
