const asyncHandler = require("express-async-handler");
const { generateFile } = require("../utils/generateFile");
const { executeNode } = require('../utils/executeNode');
const fs = require('fs');
const Test = require('../models/testModel');

const testCode = asyncHandler(async (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ success: false })
    }

    //creating a new file for the code
    const filePath = await generateFile('js', code);

    //getting the executed code output
    let output = {};
    await executeNode(filePath).then((res) => {
        output.data = res;
        output.error = false;
    }).catch((error) => {
        output.data = error.stderr;
        output.error = true;
    });

    //removing the created file
    await fs.unlink(filePath, (err) => {
        if (err) throw err;
    })

    return res.status(200).json({ filePath, output })
})

const submitCode = asyncHandler(async (req, res) => {
    const { code, testId } = req.body;

    const test = await Test.findById(testId);

    for (const testCase of test.testCases) {
        //concat the test case with the code
        let codeWithTests = `${code}\nconsole.log(${testCase.input})`;

        let filePath = await generateFile('js', codeWithTests);

        let output = {};
        await executeNode(filePath).then((res) => {
            output.data = res;
            output.error = false;
        }).catch((error) => {
            output.data = error.stderr;
            output.error = true;
        });

        if (output.error = false && output.data == `${testCase.output}\n`) {
            testCase.passed = true
        }

        //removing the created file
        await fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log('file deleted successfully')
        })
    }

    test.submittedSolution = code;
    test.completed = true;
    await test.save();

    res.status(200).json({ message: 'success' });
})

module.exports = { testCode, submitCode }