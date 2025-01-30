'use client';
import { useParams, useRouter } from 'next/navigation';

export const useAgentContext = () => {
  const router = useRouter();
  const setAgentId = (id: string) => {
    router.push(`/${id}`);
  };

  const params = useParams<{ agentId: string }>();

  return { agentId: params.agentId, setAgentId };
};
