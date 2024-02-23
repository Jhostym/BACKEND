import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {

  try {
    const tasks = await Task.find({
      user: req.user.id
    }).populate('user');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export const createTasks = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
    } = req.body;

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user._id
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user');
    if (!task)
      return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' });
  }
};

export const deleteTasks = async (req, res) => {

  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task)
      return res.status(404).json({ message: 'Task not found' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' });
  }
}

export const updateTasks = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date },
      { new: true }
    );
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

