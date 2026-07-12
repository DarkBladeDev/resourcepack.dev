import React from 'react';

export const Warning: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="warning-callout bg-yellow-900/30 border-l-4 border-yellow-500 p-4 my-4 rounded-r text-yellow-200">
      <p className="font-bold mb-1 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        Warning
      </p>
      <div className="text-sm">{children}</div>
    </div>
  );
};
