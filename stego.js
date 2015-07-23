function zip(firstList, secondList) {
  const newList = [];
  for (i = 0; i < Math.min(firstList.length, secondList.length); i++) {
    newList.push([firstList[i], secondList[i]]);
  }
  return newList;
}

function decomposeToBase(base, number) {
  const maxPower = Math.ceil(Math.log(number) / Math.log(base));
  const decomposition = [];
  var runningTotal = 0;
  for (power = maxPower; power > -1; power--) {
    var factor = Math.floor((number - runningTotal) / Math.pow(base, power));
    runningTotal += (factor * Math.pow(base, power));
    decomposition.push(factor);
  }
  return decomposition;
}

function blueLotus(text) {
  const words = text.trim().replace(/\s+/, ' ').replace(/[^a-z ]/g, '').split(' ');
  const plaintext = document.getElementById('plaintext-composer').textContent.toLocaleLowerCase().replace(/[^a-z]/g, '');
  const digrams = plaintext.match(/../g);

  const formattedWords = zip(words, digrams).map(function (wordAndDigram) {
    if (wordAndDigram[0].slice(0, 2) == wordAndDigram[1]) {
      return "<span class='match'>" + word + "</span>";
    } else {
      return "<span class='miss'>" + word + "</span>";
    }
  });

  if (words.length <= digrams.length) {
    document.getElementById('word-count').value = (digrams.length - words.length);
  }

  return formattedWords.join(" ");
}

function moduloN(base, text) {
  const words = text.trim().split(" ");
  const plaintext = document.getElementById('plaintext-composer').textContent.toLocaleLowerCase().replace(/[^a-z]/g, '');
  const codepoints = plaintext.split("").map(function (char) { return (char.charCodeAt(0) - 97); });
  const maxPower = Math.ceil(Math.log(26) / Math.log(base));
  const numbers = codepoints.map(function (codepoint) {
    var number = decomposeToBase(base, codepoint);
    while (number.length < maxPower) {
      number = [0].concat(number);
    }
    return number;
  }).reduce(function (listOne, listTwo) {
    return listOne.concat(listTwo);
  });

  const formattedWords = ['['];
  for (wordNumber = 0; wordNumber < Math.min(words.length, numbers.length); wordNumber++) {
    var word = words[wordNumber]
    var bareword = word.toLocaleLowerCase().replace(/[^a-z]/g, '')
    if ((bareword.length % base) == numbers[wordNumber]) {
      formattedWords.push("<span class='match'>" + word + "</span>");
    } else {
      formattedWords.push("<span class='miss'>" + word + "</span>");
    }
    if ((wordNumber + 1) == numbers.length) {
      formattedWords.push("]")
    }
    else if (!((wordNumber + 1) % maxPower)) {
      formattedWords.push("|");
    }
  }

  if (words.length <= numbers.length) {
    document.getElementById('word-count').value = (numbers.length - words.length);
  }
  return formattedWords.join(" ");
}

const moduloTwo = moduloN.bind(null, 2);
const moduloThree = moduloN.bind(null, 3);

function updateDisplay() {
  formatText = {
    "length-mod-2": moduloTwo,
    "length-mod-3": moduloThree,
    "blue-lotus": blueLotus
  }[document.getElementById('algorithm').value]
  document.getElementById('stegotext-display').innerHTML = formatText(document.getElementById('stegotext-composer').textContent)
}

document.getElementById('stegotext-composer').addEventListener('input', updateDisplay);
document.getElementById('plaintext-composer').addEventListener('input', updateDisplay);
