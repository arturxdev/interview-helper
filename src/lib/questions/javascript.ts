export type Question = {
  id: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "code-output" | "multiple-choice" | "true-false";
  question: {
    en: string;
    es: string;
  };
  code?: string;
  options?: {
    en: string[];
    es: string[];
  };
  correctAnswer: string | number | boolean;
  explanation: {
    en: string;
    es: string;
  };
};

export const javascriptQuestions: Question[] = [
  {
    id: "js-1",
    difficulty: "Easy",
    type: "code-output",
    question: {
      en: "What does the following code output?",
      es: "¿Qué muestra el siguiente código?",
    },
    code: `let x = 10;
function foo() {
  console.log(x);
  let x = 20;
}
foo();`,
    options: {
      en: ["10", "20", "undefined", "ReferenceError"],
      es: ["10", "20", "undefined", "ReferenceError"],
    },
    correctAnswer: "ReferenceError",
    explanation: {
      en: "This code throws a ReferenceError because of the temporal dead zone. When a block contains a let declaration, the variable exists in the block from the start, but cannot be accessed until after the declaration. This period is called the 'temporal dead zone'.",
      es: "Este código lanza un ReferenceError debido a la zona muerta temporal. Cuando un bloque contiene una declaración let, la variable existe en el bloque desde el principio, pero no se puede acceder a ella hasta después de la declaración. Este período se llama 'zona muerta temporal'.",
    },
  },
  {
    id: "js-2",
    difficulty: "Easy",
    type: "code-output",
    question: {
      en: "What does the following code output?",
      es: "¿Qué muestra el siguiente código?",
    },
    code: `let x = 10;
function foo() {
  console.log(x);
  var x = 20;
}
foo();`,
    options: {
      en: ["10", "20", "undefined", "ReferenceError"],
      es: ["10", "20", "undefined", "ReferenceError"],
    },
    correctAnswer: "undefined",
    explanation: {
      en: "This outputs 'undefined'. With 'var', variables are hoisted and initialized with 'undefined'. So console.log(x) sees the local 'x' variable, but at that point in execution, it hasn't been assigned the value 20 yet.",
      es: "Esto muestra 'undefined'. Con 'var', las variables son elevadas (hoisted) e inicializadas con 'undefined'. Entonces console.log(x) ve la variable local 'x', pero en ese punto de la ejecución, todavía no se le ha asignado el valor 20.",
    },
  },
  {
    id: "js-3",
    difficulty: "Medium",
    type: "code-output",
    question: {
      en: "What does the following code output?",
      es: "¿Qué muestra el siguiente código?",
    },
    code: `const arr = [1, 2, 3, 4, 5];
const result = arr.reduce((acc, val) => {
  if (val % 2 === 0) {
    acc.push(val * 2);
  }
  return acc;
}, []);
console.log(result);`,
    options: {
      en: ["[4, 8]", "[2, 4, 6, 8, 10]", "[4, 8, 12]", "[2, 8]"],
      es: ["[4, 8]", "[2, 4, 6, 8, 10]", "[4, 8, 12]", "[2, 8]"],
    },
    correctAnswer: "[4, 8]",
    explanation: {
      en: "The code filters even numbers and doubles them using reduce. So from [1, 2, 3, 4, 5], the even numbers are 2 and 4, which when doubled become 4 and 8, resulting in [4, 8].",
      es: "El código filtra los números pares y los duplica usando reduce. Así que de [1, 2, 3, 4, 5], los números pares son 2 y 4, que al duplicarse se convierten en 4 y 8, resultando en [4, 8].",
    },
  },
  {
    id: "js-4",
    difficulty: "Medium",
    type: "code-output",
    question: {
      en: "What does the following code output?",
      es: "¿Qué muestra el siguiente código?",
    },
    code: `Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error('Error!') })
  .catch(err => 'caught')
  .then(x => x + ' and handled')
  .catch(err => 'failed')
  .then(x => console.log(x));`,
    options: {
      en: [
        "'caught and handled'",
        "'failed'",
        "Error: Error!",
        "2 and handled",
      ],
      es: [
        "'caught and handled'",
        "'failed'",
        "Error: Error!",
        "2 and handled",
      ],
    },
    correctAnswer: "'caught and handled'",
    explanation: {
      en: "The promise chain resolves to 1, then to 2, then throws an error which is caught and resolves to 'caught'. Then it continues and resolves to 'caught and handled', which is logged.",
      es: "La cadena de promesas se resuelve a 1, luego a 2, luego lanza un error que es capturado y se resuelve como 'caught'. Luego continúa y se resuelve como 'caught and handled', que es lo que se muestra en consola.",
    },
  },
  {
    id: "js-5",
    difficulty: "Hard",
    type: "code-output",
    question: {
      en: "What does the following code output?",
      es: "¿Qué muestra el siguiente código?",
    },
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
    options: {
      en: ["2, 2", "2, 1", "2, 0", "0, 0"],
      es: ["2, 2", "2, 1", "2, 0", "0, 0"],
    },
    correctAnswer: "2, 1",
    explanation: {
      en: "This demonstrates closures in JavaScript. Each call to createCounter creates a separate closure with its own private count variable. counter1's count is incremented twice to 2, while counter2's count is incremented once to 1.",
      es: "Esto demuestra los closures en JavaScript. Cada llamada a createCounter crea un closure separado con su propia variable count privada. El count de counter1 se incrementa dos veces a 2, mientras que el count de counter2 se incrementa una vez a 1.",
    },
  },
];
