const Task = require('../model/task_model');

// fetch all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message: 'Error fetching tasks', error});
    }
};

// fetch a single task by ID
exports.getTaskById = async (req, res) => {
    try {
      const task = await task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'task not found' });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching task', error });
    }
  };

// Add a new task
exports.createTask = async (req, res) => {
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }
  
    try {
      const newTask = new Task({ name, description });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  };

  // Update an item
exports.updateTask = async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
  
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: 'Error updating Task', error });
    }
  };

// Delete an task
exports.deleteTask = async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
  
      if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  };