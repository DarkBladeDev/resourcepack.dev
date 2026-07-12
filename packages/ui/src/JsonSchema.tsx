import React from 'react';

export const JsonSchema: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="json-schema-container border border-gray-700 rounded-lg p-4 bg-gray-900 my-4">
      <h3 className="text-lg font-bold mb-2">JSON Structure</h3>
      <ul className="space-y-4">
        {children}
      </ul>
    </div>
  );
};
