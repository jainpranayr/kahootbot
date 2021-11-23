const Kahoot = require("kahoot.js-updated-fixed")
const colors = require("colors")

if (process.argv.length <= 2) {
	console.log("Usage: node main.js <pin> <amount>".green)
	process.exit(-1)
}

if (300 <= process.argv[3]) {
	console.log(
		"WARNING: Trying to send more than 300 bots will send a ETIMEDOUT error and will disconnect all bots! \nThis may also crash your internet depending on how many sockets it can handle open at one time."
			.yellow
	)
	console.log("Try running this script online for more bandwidth.".green)
}

const bots = []
for (let i = 0; i < process.argv[3]; ++i) {
	bots[i] = new Kahoot()
}

console.log("Joining kahoot...")
let e = 0

bots.forEach((bot) => {
	e++

	bot.join(process.argv[2], `kahootBot ${e}`).catch((error) => {
		console.log(`join failed ${error.description} ${error.status}`.red)
	})

	bot.on("QuestionStart", (question) => {
		question.answer(
			Math.floor(
				Math.random() * question.quizQuestionAnswers[question.questionIndex]
			) + 0
		)
	})

	bot.on("Disconnect", (reason) =>
		console.log(`disconnected because ${reason}`.red)
	)

	bot.on("QuizEnd", () => {
		console.log("The quiz has ended.".green)
	})

	return
})
