const asyncHandler = require("express-async-handler");
const Test = require('../models/testModel');

const createTest = asyncHandler(async (req, res) => {
    const { question, testCases } = req.body;
    if (!question || testCases.length === 0) {
        return res.status(400).json({ message: 'Please fill all the required fields' })
    }

    await Test.create(req.body);

    res.status(201).json({ message: 'Test created successfully' })
})

const getTest = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const foundTest = await Test.findOne({ _id: testId });

    if (!foundTest) {
        return res.status(400).json({ message: "Test doesn't exists" })
    }

    res.status(200).json(foundTest)
})

const updateTest = asyncHandler(async (req, res) => {
    const { testId } = req.params;

    const updatedDocument = await Test.findOneAndUpdate({ _id: testId }, req.body, {
        new: true
    })

    if (!updatedDocument) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, message: 'Test updated successfully' })
})

const deleteTest = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const response = await Test.deleteOne({ _id: testId });
    if (response.deletedCount !== 1) {
        return res.status(400).json({ success: false, message: 'cannot find test' })
    }
    res.status(200).json({ success: true })
})

const getAllTests = asyncHandler(async (req, res) => {
    const tests = await Test.find({});
    res.status(200).json({ success: true, tests: tests })
})

module.exports = { createTest, getTest, updateTest, getAllTests, deleteTest }