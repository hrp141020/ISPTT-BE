const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json())
app.post("/allCombinationTestCases", function (req, res) {
    res.send(allCombinationTestCases(req.body));
});
app.post("/eachChoiceCriteria", function (req, res) {
    res.send(eachChoiceCriteria(req.body));
})
app.post("/baseChoiceCriteria", function (req, res) {
    res.send(baseChoiceCriteria(req.body));
})
app.listen(port, () => {
    console.log("listening", port);
})
// All combinations
function allCombinationTestCases(chars) {
    const numArrays = chars.length;
    const indices = new Array(numArrays).fill(0);
    result = [];

    while (true) {
        const combination = [];

        for (let i = 0; i < numArrays; i++) {
            combination.push(chars[i][indices[i]]);
        }

        result.push(combination)

        let currentIndex = numArrays - 1;
        while (currentIndex >= 0 && indices[currentIndex] === chars[currentIndex].length - 1) {
            indices[currentIndex] = 0;
            currentIndex--;
        }

        if (currentIndex < 0) {
            break; // All combinations have been generated
        } else {
            indices[currentIndex]++;
        }
    }
    return result;
}

// Each Choice Criteria
function eachChoiceCriteria(chars) {
    var mostBlocks = 0;
    var result = [];
    chars.forEach(C => {
        if (C.length > mostBlocks) {
            mostBlocks = C.length;
        }
    })
    for (var testNum = 0; testNum < mostBlocks; testNum++) {
        var resultArr = [];
        chars.forEach(C => {
            if (testNum < C.length) {
                resultArr.push(C[testNum]);
            } else {
                resultArr.push("*");
            }
        });
        result.push(resultArr);
    }
    return result;
}

function baseChoiceCriteria(chars) {
    numTests = 0;
    numChars = 3;
    var result = []
    chars.forEach(C => {
        numTests += C.length;
    });
    numTests -= (numChars - 1);
    console.log("test case 1:", numTests)
    var baseTest = [];
    chars.forEach(C => {
        console.log(C[0]);
        baseTest.push(C[0]);
    });
    charNum = 0;
    var currentTest;
    chars.forEach(C => {
        currentTest = JSON.parse(JSON.stringify(baseTest));
        for (blockNum = 1; blockNum < C.length; blockNum++) {
            currentTest[charNum] = C[blockNum];
            console.log(currentTest)
            result.push(currentTest)
        }
        charNum++;
    })
    return result;
}