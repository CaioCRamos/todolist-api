const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "O título é obrigatório"],
        trim: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    tags: [{
        type: String,
        required: false
    }]
});

module.exports = mongoose.model("Todo", schema);