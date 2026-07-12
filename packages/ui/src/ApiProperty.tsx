import React from 'react';

interface ApiPropertyProps {
  name: string;
  type: string;
  required?: boolean;
  children: React.ReactNode;
}

export const ApiProperty: React.FC<ApiPropertyProps> = ({ name, type, required = false, children }) => {
  return (
    <li className="api-property">
      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="text-blue-400 font-bold">{name}</span>
        <span className="text-gray-500">:</span>
        <span className="text-green-400">{type}</span>
        {required && <span className="text-red-400 text-xs uppercase tracking-wider ml-2 border border-red-800 rounded px-1">Required</span>}
      </div>
      <div className="text-gray-300 mt-1 pl-4 border-l-2 border-gray-700 text-sm">
        {children}
      </div>
    </li>
  );
};
