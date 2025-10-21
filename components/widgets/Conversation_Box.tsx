import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, User, Bot } from 'lucide-react';

interface ConversationBoxProps {
    title?: string;
    placeholder?: string;
    subject?: string;
}

export const ConversationBox = ({
    title = "AI Assistant",
    placeholder = "Type a message...",
    subject
}: ConversationBoxProps) => {
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
        }
    };

    return (
        <Card className="futuristic-card w-full">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    {title}
                    {subject && (
                        <Badge variant="outline" className="ml-auto futuristic-button">
                            {subject}
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-96 overflow-y-auto mb-4 space-y-4 p-2">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <Bot className="h-12 w-12 mb-2 text-blue-500" />
                            <p className="text-center">Start a conversation with the AI assistant</p>
                        </div>
                    ) : (
                        messages.map(message => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <Bot className="h-4 w-4 text-white" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                        message.role === 'user'
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                            : 'bg-muted'
                                    }`}
                                >
                                    {message.parts.map((part, index) => {
                                        if (part.type === 'text') {
                                            return (
                                                <p key={index} className="text-sm">
                                                    {part.text}
                                                </p>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                {message.role === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <User className="h-4 w-4 text-white" />
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder={placeholder}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" className="futuristic-button">
                        <Send className="h-4 w-4 text-black" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ConversationBox;
