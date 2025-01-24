import * as React from 'react';

interface StatusCircleProps {
    isConnected: boolean | undefined;
    isLoading: boolean;
}

const StatusCircle: React.FC<StatusCircleProps> = ({ isConnected, isLoading }) => {
    return (
        <div
            className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}
        />
    );
};

export { StatusCircle };
