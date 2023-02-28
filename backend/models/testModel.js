const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    applicant: {
        type: String
    },
    question: {
        type: String
    },
    initialIDECode: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    submittedSolution: {
        type: String
    },
    testCases: [{
        input: String,
        output: String,
        passed: {
            type: Boolean,
            default: false
        }
    }],
}, {
    timestamps: true,
})

module.exports = mongoose.model("Test", TestSchema);