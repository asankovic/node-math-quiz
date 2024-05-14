# Node Math Quiz
Simple Math Quiz CLI app written in Node.js, in purpose of learning basic Node.js concepts. Based on similar thing for Go [GopherExercise #1](https://github.com/gophercises/quiz), but slightly modified with some custom additions.
# Description
Basic idea of this app is to give user math tasks, and validate their input. App has a few flags which present options for customization:

| Flag | Type | Description | Default value |
| ------ | ------ | ------ | ------ |
| --questions-file | string | CSV file containing tasks for quiz. Format must be 'question,answer'. Your file can contain any type of tasks, it is only required for them to be in the format `<number\> (+ \| - \| * \| %) <number> =` (see example in questions.csv). <br/> Generated questions will, for the sake of simplicity of working with integers, have the following operations: **addition, subtraction, multiplication, and modulo**. | questions.csv |
| --time-limit | number | Time, in format `<number>(s\|m)`, you will have to solve the tasks. I.e. provide time in either minutes or seconds. 0s/m means there is no time limit. <br/> With time running out, the quiz will stop on the question you were at, at that time| 60s |
| --shuffle | boolean | Whether tasks should be shuffled before each questioning session. | false |
| --generate-questions | boolean | Whether questions should be randomly generated for each round, rather than taken from file. Takes priority over file option. <br/><br/> Next flags also work only for generated questions scenario. | false |
| --level | number | Level is considered only when generating tasks. Number of level basically corresponds to number of digits in numbers used for tasks. For fun, there is no limit on the number of digits. <br/><br/> Connsidered only when generating questions. <br/><br/> **Example**: choosing level 2 may generate numbers between 10 and 100 (not including 100) for your tasks.|1|
| --quantity | number | Number of tasks per questioning session.<br/><br/> Connsidered only when generating questions. | 10 |


All defaults are located in `.env.example` file. 

App will take provided flags, and form a math quiz. Quiz is replayable by interacting with the app, but the questions will repeat (may be reshuffled if shuffle is enabled). Generated tasks are saved in new CSV file for user to take a look at, or reuse later on.

Run the app by using `npm start` and feel free to either modify `.env` file or pass mentioned arguments.
