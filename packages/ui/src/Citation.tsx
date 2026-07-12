import React from 'react';

export const Citation: React.FC<{ sourceId: string }> = ({ sourceId }) => {
  return (
    <sup className="citation">
      <a href={`/sources/${sourceId}`} className="text-blue-400 hover:underline cursor-pointer" title={`Cite: ${sourceId}`}>
        [{sourceId.split('.').pop()}]
      </a>
    </sup>
  );
};
