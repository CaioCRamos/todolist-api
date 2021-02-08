const Todo = require("../models/Todo");

exports.getAll = async () => {
    return await Todo.find({}, "title done tags");
};

exports.getById = async (id) => {
    return await Todo.findById(id);
};

exports.create = async (data) => {
    const todo = new Todo(data);
    await todo.save();
    return todo;
};

exports.edit = async (id, data) => {
    const { title, done, tags } = data;

    await Todo.findByIdAndUpdate(id, {
        $set: {
            title: title,
            done: done,
            tags: tags
        }
    });
};

exports.delete = async (id) => {
    await Todo.findByIdAndRemove(id);
};