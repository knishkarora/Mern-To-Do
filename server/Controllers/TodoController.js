const TodoModel = require('../Models/Todo');

const getTodos = async (req, res) => {
    try {
        const todos = await TodoModel.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, todos });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', success: false });
    }
};

const addTodo = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) {
            return res.status(400).json({ msg: 'Todo text is required', success: false });
        }

        const todo = new TodoModel({
            text: text.trim(),
            user: req.user._id
        });

        await todo.save();
        res.status(201).json({ success: true, todo });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', success: false });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await TodoModel.findOneAndDelete({ _id: id, user: req.user._id });
        
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found', success: false });
        }

        res.status(200).json({ success: true, msg: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', success: false });
    }
};

module.exports = {
    getTodos,
    addTodo,
    deleteTodo
}; 