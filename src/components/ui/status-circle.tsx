import * as React from 'react';

interface StatusCircleProps {
    isLoading: boolean;
}

const StatusCircle: React.FC<StatusCircleProps> = ({ isLoading }) => {
    return (
        <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-green-500' : 'bg-yellow-500'} mr-2`} />
    );
};

export { StatusCircle };
