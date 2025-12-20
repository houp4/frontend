function createAlphabet(keyword) {
  let uniqueKeyword = '';
  for (let char of keyword.toLowerCase()) {
    if (!uniqueKeyword.includes(char)) {
      uniqueKeyword += char;
    }
  }

  const russianAlphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  let alphabet = uniqueKeyword;

  for (let char of russianAlphabet) {
    if (!alphabet.includes(char)) {
      alphabet += char;
    }
  }
  return alphabet;
}

function decrypt(text, alphabet, shift) {
  let result = '';
  for (let char of text) {
    const lowerChar = char.toLowerCase();
    const index = alphabet.indexOf(lowerChar);
    if (index !== -1) {
      let newIndex = (index - shift + alphabet.length) % alphabet.length;
      result += (char === char.toUpperCase())
        ? alphabet[newIndex].toUpperCase()
        : alphabet[newIndex];
    } else {
      result += char;
    }
  }
  return result;
}

function main() {
  const encryptedText = `ЪЙШФЗЩ СЭФ ЫЗ ЕЙМЬЗХ КБФД. О ЬХ ФЖЫЙБ, ТЁЭ ГВБ ШДМЬЦ ЫЗ ЭВЁЙЧЫВО ЭФЬДЫ Д ЁХЫ
ШХ ТХКЭГХЪЭЫ`;

  const keywords = [
    'поражение',
    'виртуализация',
    'метеорит',
    'феномен',
    'баскетбол',
    'эксперимент',
    'автоматизация'
  ];

  const shiftRange = [11, 12, 13, 14];

  for (let keyword of keywords) {
    const alphabet = createAlphabet(keyword);
    console.log(`\nКлюч: ${keyword}`);
    console.log(`Алфавит: ${alphabet}`);
    for (let shift of shiftRange) {
      console.log(`\nСдвиг: ${shift}`);
      console.log(decrypt(encryptedText, alphabet, shift));
    }
  }
}

main();