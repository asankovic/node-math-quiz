const readline = require("readline/promises");
const process = require("node:process");

let singleReadline;

function getReadlineInterface() {
  if (!singleReadline) {
    singleReadline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    process.on("SIGINT", () => {
      singleReadline.close();
      process.exit();
    });

    process.on("exit", () => {
      singleReadline.close();
    });
  }

  return singleReadline;
}

function getParameters() {
  const questionsFile = getArgument(
    "--questions-file",
    process.env.QUESTIONS_FILE,
  );
  const shuffle = asBoolean(getArgument("--shuffle", process.env.SHUFFLE));
  const timeLimit = validateAndConvertTimeLimit(
    getArgument("--time-limit", process.env.TIME_LIMIT),
  );

  const generate = asBoolean(
    getArgument("--generate-questions", process.env.GENERATE_QUESTIONS),
  );
  const level = getArgument("--level", process.env.LEVEL);
  const quantity = getArgument("--quantity", process.env.QUANTITY);

  const structure = getArgument(
    "--structure",
    process.env.QUESTIONS_ATTRIBUTES,
  )?.split(",");

  return {
    questionsFile,
    shuffle,
    structure,
    timeLimit,
    generate,
    level,
    quantity,
  };
}

function getArgument(name, defaultValue) {
  const index = process.argv.indexOf(name);

  if (index === -1) {
    return defaultValue;
  }

  return process.argv[index + 1];
}

function asBoolean(value) {
  return value === "true";
}

function validateAndConvertTimeLimit(timeLimit) {
  const allowedFormat = /^(\d+)([ms])$/;
  const match = timeLimit.match(allowedFormat);

  if (!match) {
    throw new Error(`Invalid time limit format: ${timeLimit}`);
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  const limitInSeconds = unit === "m" ? value * 60 : value;

  return limitInSeconds * 1000;
}

module.exports = {
  getReadlineInterface,
  getParameters,
};
