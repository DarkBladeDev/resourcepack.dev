import React from 'react';
interface ApiPropertyProps {
    name: string;
    type: string;
    required?: boolean;
    children: React.ReactNode;
}
export declare const ApiProperty: React.FC<ApiPropertyProps>;
export {};
