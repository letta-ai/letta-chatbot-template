'use client';
import React, { createContext, useContext, useState } from 'react';

interface AgentContextProps {
  agentId: string;
  setAgentId: (id: string) => void;
}

const AgentContext = createContext<AgentContextProps | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeAgentId, setAgentId] = useState<string>('');

  return (
    <AgentContext.Provider value={{ agentId: activeAgentId, setAgentId }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('error with agentcontext');
  }
  return context;
};
