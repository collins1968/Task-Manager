import { useState } from 'react';

const FAQComponent = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const questions = [
    {
      question: 'What is the purpose of this project?',
      answer: 'The purpose of this project is to create a task management system that helps teams streamline their task creation, assignment, and tracking processes.'
    },
    {
      question: 'How can I create a new task?',
      answer: 'To create a new task, navigate to the task creation page and fill in the required details such as title, description, due dates, priority levels, and associated project or category.'
    },
    {
        question: 'How can I assign a task to multiple users?',
        answer: 'To assign a task to multiple users, navigate to the task details page and select the desired users from the "Assign Users" dropdown or input field.'
      },
      {
        question: 'Can I set task dependencies?',
        answer: 'Yes, you can set task dependencies. When creating or updating a task, you can specify which tasks must be completed before the current task can start.'
      },
      {
        question: 'How can I filter and sort tasks?',
        answer: 'You can filter and sort tasks based on various criteria such as priority, due date, project, or assigned team member. Use the provided filters and sorting options on the task management page.'
      },
      {
        question: 'Is there a way to receive task notifications?',
        answer: 'Yes, you can configure your notification settings to receive task-related notifications such as task assignments, updates, and approaching deadlines via email or in-app notifications.'
      },
  ];

  const toggleQuestion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-4"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <h3 className="text-lg font-medium">{item.question}</h3>
              <svg
                className={`w-5 h-5 transition-transform ${
                  expandedIndex === index ? 'transform rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {expandedIndex === index && (
              <div className="mt-4">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;
