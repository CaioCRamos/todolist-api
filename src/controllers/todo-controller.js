const Todo = require("../models/Todo");

exports.getAll = (req, res) => {
    Todo.find({}, "title done tags")
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send({
                message: "Error",
                data: error
            });
        });
};

exports.getById = (req, res) => {
    const { id } = req.params;

    Todo.findById(id)
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send({
                message: "Error",
                data: error
            });
        });
};

exports.create = async (req, res) => {
    const todo = new Todo(req.body);

    todo.save()
        .then(x => {
            res.status(201).send({ message: "Todo created" });
        }).catch(error => {
            res.status(400).send({
                message: "Error",
                data: error
            });
        });
};

exports.edit = (req, res) => {
    const { id } = req.params;
    const { title, done, tags } = req.body;

    Todo.findByIdAndUpdate(id, {
        $set: {
            title: title,
            done: done,
            tags: tags
        }
    }).then(x => {
        res.status(201).send({ message: "Todo updated" });
    }).catch(error => {
        res.status(400).send({
            message: "Error",
            data: error
        });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Todo.findByIdAndRemove(id)
        .then(x => {
            res.status(200).send({ message: "Todo deleted" })
        }).catch(error => {
            res.status(400).send({
                message: "Error",
                data: error
            })
        });
};