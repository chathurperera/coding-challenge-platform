const esprima = require('esprima');

function myFunction() {
  console.log("Hello, world!");
}

const functionSource = myFunction.toString();
const functionAst = esprima.parseScript(functionSource);

// Traverse the AST to find the function declaration
let functionBody;
functionAst.body.forEach((node) => {
  if (node.type === 'FunctionDeclaration') {
    functionBody = node.body;
  }
  if (node.type === 'ExpressionStatement' && node.expression.type === 'ArrowFunctionExpression') {
    functionBody = node.expression.body;
  }
}); 

console.log(functionBody); // Output: { type: 'BlockStatement', body: [ [Object] ] }
