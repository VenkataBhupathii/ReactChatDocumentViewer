// src/components/SelectedItemsList.jsx
import React from 'react';

const SelectedItemsList = ({ selections, onDelete }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Selected Documents</h2>
      {selections.length === 0 ? (
        <p>No documents selected.</p>
      ) : (
        <ul className="list-disc list-inside">
          {selections.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{`${item.company} - ${item.docType} - ${item.year}`}</span>
              <button
                className="ml-2 text-red-500"
                onClick={() => onDelete(index)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedItemsList;

  