const { once } = require("events");
const fs = require("fs").promises;
const path = require("path");

async function readStructure(fileName, structure) {
  const file = await fs.open(fileName);
  let entries = [];

  for await (const line of file.readLines()) {
    const values = line.split(",");
    let entry = {};

    structure.forEach((field, index) => {
      entry[field] = values[index];
    });

    if (isStructureValid(entry, structure)) {
      entries.push(entry);
    }
  }

  return entries;
}

function isStructureValid(entry, structure) {
  let valid = true;

  structure.forEach((field) => {
    if (entry[field] === undefined) {
      console.warn(`Missing field ${field} in entry ${JSON.stringify(entry)}`);
      valid = false;
    }
  });

  return valid;
}

async function saveToFile(rows, fileName, directory = ".") {
  let fileHandle;

  try {
    await fs.mkdir(directory, { recursive: true });
    const timestampFileName = `${new Date().getTime()}_${fileName}`;
    fileHandle = await fs.open(path.join(directory, timestampFileName), "w");
    const writer = fileHandle.createWriteStream({ encoding: "utf-8" });

    for (const row of rows) {
      if (!writer.write(`${row}\n`)) {
        await once(writer, "drain");
      }
    }

    writer.end();
    await once(writer, "finish");
  } catch (err) {
    console.error(`Error saving to file: ${err.message}`);
  } finally {
    await fileHandle.close();
  }
}

module.exports = { readStructure, saveToFile };
