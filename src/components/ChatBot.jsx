import React, { useState } from 'react';

const ChatBot = ({ messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [showPrompts, setShowPrompts] = useState(true); // Controls whether to display prompts

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: 'user' },
        { text: 'Sorry, I wasn\'t able to understand your question or I don\'t have an answer for it.', sender: 'bot' },
      ]);
      setInput('');
    }
  };

  // Predefined question prompts
  const questionPrompts = [
    'Which company had the highest revenue?',
    'What are their main business focus areas?',
    'What are the biggest discussed risks?',
  ];

  // Handle click on question prompt
  const handlePromptClick = (question) => {
    setInput(question);
    setShowPrompts(false); // Hide prompts after selecting a question
  };

  return (
    <div className="flex flex-col h-screen p-5 bg-white">
      {/* Back to Document Selection */}
      <h2 className="text-gray-500 text-lg mb-4 cursor-pointer">← Back to Document Selection</h2>

      {/* Chat Section */}
      <div className="flex-grow mt-5">
        <div className="h-96 overflow-y-auto border border-gray-300 p-4 rounded-lg bg-white">
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}

          {/* Question Prompts within Chat Section */}
          {showPrompts && (
            <div className="mt-4">
        <p className="font-semibold text-gray-600 mb-2 text-center leading-relaxed">
        ✉️
<br />
  Ask SEC Insights questions about the 
  <br />
  documents you've selected, such as:
</p>



              {questionPrompts.map((prompt, index) => (
                 <div className="flex justify-center">
                 <button
                   key={index}
                   onClick={() => handlePromptClick(prompt)}
                   className="flex justify-center items-center w-full max-w-xs mb-2 p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-md transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600 text-sm ml-4" // Adjusted margin-left here
                 >
                   {prompt}
                 </button>
               </div>
               
               
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <form onSubmit={handleChatSubmit} className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start typing your question..."
          className="flex-grow p-3 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="ml-3 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 focus:outline-none"
        >
          ↑
        </button>
      </form>
    </div>
  );
};

export default ChatBot;

