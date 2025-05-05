export type Question = {
  id: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "code-output" | "multiple-choice" | "true-false";
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
};

export const javascriptQuestions: Question[] = [
  {
    id: "js-1",
    difficulty: "Easy",
    type: "code-output",
    question: "What does the following code output?",
    code: `let x = 10;
function foo() {
  console.log(x);
  let x = 20;
}
foo();`,
    options: ["10", "20", "undefined", "ReferenceError"],
    correctAnswer: "ReferenceError",
    explanation:
      "This code throws a ReferenceError because of the temporal dead zone. When a block contains a let declaration, the variable exists in the block from the start, but cannot be accessed until after the declaration. This period is called the 'temporal dead zone'.",
  },
  {
    id: "js-2",
    difficulty: "Easy",
    type: "code-output",
    question: "What does the following code output?",
    code: `let x = 10;
function foo() {
  console.log(x);
  var x = 20;
}
foo();`,
    options: ["10", "20", "undefined", "ReferenceError"],
    correctAnswer: "undefined",
    explanation:
      "This outputs 'undefined'. With 'var', variables are hoisted and initialized with 'undefined'. So console.log(x) sees the local 'x' variable, but at that point in execution, it hasn't been assigned the value 20 yet.",
  },
  {
    id: "js-3",
    difficulty: "Medium",
    type: "code-output",
    question: "What does the following code output?",
    code: `const arr = [1, 2, 3, 4, 5];
const result = arr.reduce((acc, val) => {
  if (val % 2 === 0) {
    acc.push(val * 2);
  }
  return acc;
}, []);
console.log(result);`,
    options: ["[4, 8]", "[2, 4, 6, 8, 10]", "[4, 8, 12]", "[2, 8]"],
    correctAnswer: "[4, 8]",
    explanation:
      "The code filters even numbers and doubles them using reduce. So from [1, 2, 3, 4, 5], the even numbers are 2 and 4, which when doubled become 4 and 8, resulting in [4, 8].",
  },
  {
    id: "js-4",
    difficulty: "Medium",
    type: "code-output",
    question: "What does the following code output?",
    code: `Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error('Error!') })
  .catch(err => 'caught')
  .then(x => x + ' and handled')
  .catch(err => 'failed')
  .then(x => console.log(x));`,
    options: [
      "'caught and handled'",
      "'failed'",
      "Error: Error!",
      "2 and handled",
    ],
    correctAnswer: "'caught and handled'",
    explanation:
      "The promise chain resolves to 1, then to 2, then throws an error which is caught and resolves to 'caught'. Then it continues and resolves to 'caught and handled', which is logged.",
  },
  {
    id: "js-5",
    difficulty: "Hard",
    type: "code-output",
    question: "What does the following code output?",
    code: `function createCounter() {
  let count = 0;
  return {
    increment: function() {
      count++;
    },
    decrement: function() {
      count--;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1.increment();
counter1.increment();
counter2.increment();

console.log(counter1.getCount(), counter2.getCount());`,
    options: ["2, 2", "2, 1", "2, 0", "0, 0"],
    correctAnswer: "2, 1",
    explanation:
      "This demonstrates closures in JavaScript. Each call to createCounter creates a separate closure with its own private count variable. counter1's count is incremented twice to 2, while counter2's count is incremented once to 1.",
  },
];
