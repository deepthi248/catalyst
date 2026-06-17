// //Q1
// const fruits = ["apple", "banana", "avocado", "blueberry", "apricot", "cherry"];

// const answer = fruits.reduce((accumulator, currentFruit) => {
//   const first_char = currentFruit[0];

//   accumulator[first_char] = [...(accumulator[first_char] || []), currentFruit];
//   return accumulator;
// }, {});

// console.log(answer);

// // Q2: Group students by grade

// const students = [
//   { name: "Arjun", grade: "A", score: 92 },
//   { name: "Priya", grade: "B", score: 78 },
//   { name: "Ravi", grade: "A", score: 95 },
//   { name: "Sneha", grade: "C", score: 61 },
//   { name: "Kiran", grade: "B", score: 82 },
//   { name: "Divya", grade: "A", score: 88 },
// ];

// const graded_wise_students = students.reduce((acc, student) => {
//   const condition = student.grade;
//   acc[condition] = [...(acc[condition] || []), student.name];
//   return acc;
// }, {});
// console.log(graded_wise_students);

// // Q3: Count how many students per grade (don't store the objects, just count)

// const student_grade_wise_count = students.reduce((acc, student) => {
//   const condition = student.grade;
//   acc[condition] = (acc[condition] || 0) + 1;
//   return acc;
// }, {});

// console.log(student_grade_wise_count);

// // Q4: Get the highest score per grade
// const highest_score_per_grade = students.reduce((acc, student) => {
//   const key = student.grade;
//   //we need to get the highest scorer
//   const currentHighest = acc[key] ? acc[key] : 0

//   acc[key] =
//     student.score > currentHighest
//       ? student.score
//       : currentHighest
  
//   return acc;
// }, {});

// console.log(highest_score_per_grade)


// // Q5: Group by type (credit / debit)
//  const transactions = [
//   { id: 1, type: 'credit', category: 'salary',    amount: 50000 },
//   { id: 2, type: 'debit',  category: 'food',      amount: 800   },
//   { id: 3, type: 'debit',  category: 'transport', amount: 300   },
//   { id: 4, type: 'credit', category: 'freelance', amount: 15000 },
//   { id: 5, type: 'debit',  category: 'food',      amount: 1200  },
//   { id: 6, type: 'debit',  category: 'transport', amount: 450   },
// ]

// const grouped_transactions = transactions.reduce((acc, trans)=>{
//     const key = trans.type
//     acc[key] = [...(acc[key] || []), trans]
//     return acc
// },{})

// console.log(grouped_transactions)

// // Q6: Total amount per category
// const grouped_category = transactions.reduce((acc, trans)=>{
//     const key = trans.category
//     acc[key] = (acc[key] || 0)+ trans.amount
//     return acc
// },{})

// console.log(grouped_category)

// // Q7: Total credits vs total debits (single numbers)
// const grouped_amount = transactions.reduce((acc, trans)=>{
//     const key = trans.type
//     acc[key] = (acc[key] || 0) + trans.amount
//     return acc
// },{})

// console.log(grouped_amount)

// //Group jobs by status
// const jobs = [
//   { id: '1', company: 'Stripe',    status: 'Applied'      },
//   { id: '2', company: 'Razorpay',  status: 'Interviewing' },
//   { id: '3', company: 'Zepto',     status: 'Rejected'     },
//   { id: '4', company: 'Cred',      status: 'Applied'      },
//   { id: '5', company: 'Swiggy',    status: 'Offer'        },
//   { id: '6', company: 'PhonePe',   status: 'Interviewing' },
// ]

// const grouped_status = jobs.reduce((acc, job)=>{
//     const key = job.status
//     acc[key] = [...(acc[key]||[]), job]

//     return acc
// },{})
// console.log(grouped_status)