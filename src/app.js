const { getReadlineInterface, getParameters } = require("./userInterface");
const { shuffleIntoNew, setAbortableTimer, logOrRetrhow } = require("./utils");
const { askQuestions, getQuestions } = require("./questions");

async function orchestrateQuiz() {
  try {
    const rl = getReadlineInterface();
    const {
      questionsFile,
      shuffle,
      structure,
      timeLimit,
      generate,
      level,
      quantity,
    } = getParameters();

    console.log("Welcome to the math quiz!");
    await rl.question("Press enter when you want to see the questions...");

    const sourceQuestions = await getQuestions({
      questionsFile,
      structure,
      generate,
      level,
      quantity,
    });

    let again = true;
    while (again) {
      const thisRoundQuestions = prepareQuestions(sourceQuestions, shuffle);
      await startRound(thisRoundQuestions, timeLimit);

      again = (await rl.question("Do you want to play again? (y/n)\n")) === "y";
    }

    console.log("Thanks for playing, bye!");
    process.exit(0);
  } catch (error) {
    console.error(
      "Something went wrong during the quiz, please try again later!\n",
      error.message,
    );

    process.exit(1);
  }
}

function prepareQuestions(questions, shuffle) {
  return shuffle ? shuffleIntoNew(questions) : questions;
}

async function startRound(questions, timeLimit) {
  const aborter = new AbortController();
  let parameters = {
    correctCounter: 0,
    aborter,
    questions,
    rl: getReadlineInterface(),
  };

  try {
    setAbortableTimer(timeLimit, aborter);
    await askQuestions(parameters);
  } catch (error) {
    logOrRetrhow(error, ["AbortError"], "Sorry, time is up!");
  }

  console.log(
    `You got ${parameters.correctCounter} correct out of ${questions.length}`,
  );
}

(async () => {
  await orchestrateQuiz();
})();
