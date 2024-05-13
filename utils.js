function shuffleIntoNew(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

function setAbortableTimer(timeLimit, aborter) {
  if (timeLimit) {
    setTimeout(() => {
      aborter.abort("Time is up!");
    }, timeLimit);
  }
}

function logOrRetrhow(error, validTypes, validMessage) {
  if (validTypes.includes(error.name)) {
    console.log(validMessage || error.message);
    return;
  }

  throw error;
}

module.exports = { shuffleIntoNew, setAbortableTimer, logOrRetrhow };
