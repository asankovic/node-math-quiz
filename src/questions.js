const { readStructure, saveToFile } = require("./csvWorker");

const operations = {
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "*",
  MODULUS: "%",
};

async function getQuestions(options) {
  const { questionsFile, structure, generate } = options;

  if (generate) {
    return generateQuestions(options);
  }

  return await readStructure(questionsFile, structure);
}

function generateQuestions(options) {
  const { level, quantity } = options;
  let questions = [];

  const min = Math.pow(10, level - 1);
  const max = Math.pow(10, level);
  for (let i = 0; i < quantity; i++) {
    const firstNumber = Math.floor(Math.random() * (max - min) + min);
    const secondNumber = Math.floor(Math.random() * (max - min) + min);
    const question = formatQuestion(firstNumber, secondNumber);
    questions.push(question);
  }

  backupQuestions(questions);

  return questions;
}

function formatQuestion(firstNumber, secondNumber) {
  const operation =
    Object.keys(operations)[
      Math.floor(Math.random() * Object.keys(operations).length)
    ];

  const question = `${firstNumber}${operations[operation]}${secondNumber}`;
  const answer = String(eval(question));

  return {
    question,
    answer,
  };
}

function backupQuestions(questions) {
  const backupQuestions = questions.map(
    (question) => `${question.question},${question.answer}`,
  );

  saveToFile(backupQuestions, "backup.csv", process.env.BACKUP_DIRECTORY);
}

async function askQuestions(parameters) {
  let correct = 0;
  const { aborter, questions, rl } = parameters;

  for (const question of questions) {
    if (aborter.signal.aborted) {
      break;
    }

    const answer = await rl.question(`How much is ${question.question}?\n`, {
      signal: aborter.signal,
    });

    if (answer === question.answer) {
      parameters.correctCounter++;
    }
  }

  return correct;
}

module.exports = { askQuestions, getQuestions };
