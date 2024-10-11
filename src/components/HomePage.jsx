import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import SelectedItemsList from './SelectedItemsList';
import Header from './Header';

const HomePage = () => {
  const [selections, setSelections] = useState([]);
  const [form, setForm] = useState({ company: '', docType: '', year: '' });
  const [count, setCount] = useState(10); // Max 10 docs

  const changeCount = () => {
    if (count > 0) {
      setCount(count - 1); // Decrease the count by 1
    }
  };

  const handleAdd = () => {
    if (form.company && form.docType && form.year && count > 0) {
      // Set the document path based on the selected document type
      const pdfPath = form.docType === '10K' ? '/p1.pdf' : '/p2.pdf'; // Adjust logic as needed
      setSelections([...selections, { ...form, document: pdfPath }]);
      setForm({ company: '', docType: '', year: '' });
      changeCount();
    }
  };

  const handleDelete = (index) => {
    setSelections(selections.filter((_, i) => i !== index));
    setCount(count + 1); // Increase count when a document is deleted
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-white to-green-200 p-8 flex items-center justify-center">
        <div className="w-full mx-6 bg-white p-8 rounded-md shadow-lg">
          <h1 className="text-center text-3xl font-bold mb-6">
            Start your conversation by selecting the documents you want to explore
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            >
              <option value="">Search by company ticker or name</option>
              <option value="Apple Inc.AAPL">Apple Inc.AAPL</option>
              <option value="Meta Platforms,Inc">Meta Platforms,Inc</option>
            </select>

            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={form.docType}
              onChange={(e) => setForm({ ...form, docType: e.target.value })}
            >
              <option value="">Select Document Type (Form 10K or Form 10Q)</option>
              <option value="10K">Form 10K</option>
              <option value="10Q">Form 10Q</option>
            </select>

            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            >
              <option value="">Select Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <button
            onClick={handleAdd}
            className={`bg-blue-500 text-white py-1 px-4 rounded text-sm mx-auto block ${count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={count === 0}
          >
            Add
          </button>
          <p className="text-center mt-2 text-xs">
            <span className="font-bold">Shift+Enter</span> to add the list
          </p>

          <SelectedItemsList selections={selections} onDelete={handleDelete} />

          <div className="mt-6 flex justify-between items-center">
          <p className="text-gray-600 ml-80">Add {count} more docs </p>  <p>or</p>
          <Link
    to="/chat"
    state={{ selectedPDFs: selections }}  // Correctly passing the selected PDFs
    className={`bg-green-500 text-white py-2 px-4 rounded mr-80 ${selections.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} // Added mr-2 for slight margin-right
    disabled={selections.length === 0}
  >
    Start Your Conversation ⟶
  </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
