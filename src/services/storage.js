const storageController = {
	getTaskNames: function () {
		return JSON.parse(localStorage.taskNames);
	},

	setTaskNames: function (taskNames) {
		localStorage.setItem("taskNames", JSON.stringify(taskNames));
	},

	getTasks: function () {
		return JSON.parse(localStorage.tasks);
	},

	setTasks: function (tasks) {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	},

	init: function () {
		if (localStorage.taskNames && localStorage.tasks) return;

		let tasks, taskNames;

		if (!localStorage.taskNames) {
			taskNames = ["Groceries", "School"];
		}

		if (!localStorage.tasks) {
			tasks = {
				school: {
					title: "School",
					notes: [
						{
							id: 1,
							note: "Note 1",
							dueDate: new Date(),
							done: false
						},
						{
							id: 2,
							note: "Note 2",
							dueDate: new Date(),
							done: true
						}
					]
				},
				groceries: {
					title: "Groceries",
					notes: [
						{
							id: 1,
							note: "Get some almond milk.",
							dueDate: new Date(),
							done: true
						},
						{
							id: 2,
							note: "Get orange juice.",
							dueDate: new Date(),
							done: false
						}
					]
				}
			};
		}

		this.setTasks(tasks);
		this.setTaskNames(taskNames);
	}
};

export default storageController;
