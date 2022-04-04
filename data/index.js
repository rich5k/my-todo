const tasks = require('./task.json');
const taskCategory = require('./taskCategory.json');
module.exports = () => ({
tasks: tasks,
taskCategory: taskCategory,
});
