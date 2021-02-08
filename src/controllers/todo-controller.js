const repository = require("../repositories/todo-repository");
const authService = require("../services/auth-service");

exports.getAll = async (req, res) => {
    try {
        const todos = await repository.getAll();
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        });
    }
};

exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await repository.getById(id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        });
    }
};

exports.create = async (req, res) => {
    const { title, done, tags } = req.body;
    const user = authService.getUserData(req);

    try {
        await repository.create({
            user: user.id,
            title: title,
            done: done,
            tags: tags
        });

        res.status(201).json({ message: "TODO Created" });
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        });
    }
};

exports.edit = async (req, res) => {
    const { id } = req.params;
    const { title, done, tags } = req.body;

    try {
        await repository.edit(id, {
            title: title,
            done: done,
            tags: tags
        });

        res.status(201).json({ message: "TODO Updated" });
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        await repository.delete(id);
        res.status(200).json({ message: "TODO deleted" })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        });
    }
};