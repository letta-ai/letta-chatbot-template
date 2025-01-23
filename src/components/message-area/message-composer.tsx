'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useRef } from 'react';
import { ArrowUpIcon } from 'lucide-react';
import { useAgentContext } from '@/app/[agentId]/context/agent-context';
import { useSendMessage } from '../hooks/use-send-message';

export function MessageComposer() {
  const { agentId } = useAgentContext();
  const { mutate: sendMessage, isPending } = useSendMessage();

  const parentRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    defaultValues: { message: '' },
  });
  async function onSubmit(data: { message: string }) {
    if (isPending) {
      return;
    }
    form.reset();
    sendMessage({ agentId, text: data.message });
  }

  return (
    <div className="flex min-w-0 flex-col justify-end">
      <div className="relative mx-auto flex w-full gap-2 p-2 md:max-w-3xl md:pb-6">
        <div
          ref={parentRef}
          tabIndex={-1}
          className="block max-h-[calc(75dvh)] w-full flex-col rounded-md border border-input bg-muted px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="!focus-visible:outline-none !focus-visible:ring-0 flex w-full resize-none overflow-hidden border-none bg-transparent text-base shadow-none ring-0 placeholder:text-muted-foreground hover:border-none focus:border-none focus:ring-0 md:text-sm"
                        placeholder="Send a message..."
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="flex h-8 w-1 items-center justify-center rounded-full"
                  disabled={isPending}
                >
                  <ArrowUpIcon width={14} height={16} />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
