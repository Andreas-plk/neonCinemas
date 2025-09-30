'use client';
import {useChat} from '@ai-sdk/react'
import {useEffect, useRef, useState} from 'react'
import { Button } from "./ui/button";
import {ArrowDownCircleIcon, MessageCircle, Send, X} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";

const ChatBot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const chatIconRef = useRef<HTMLButtonElement>(null)
    const bottomRef=useRef<HTMLDivElement>(null)

    const [input, setInput] = useState('')
    const {messages,sendMessage,status,error,regenerate} = useChat()

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    }

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

    return (
        <div>
            {/*Toggle Button*/}
            <div className="fixed bottom-4 right-4 z-50">
                <Button ref={chatIconRef} onClick={toggleChat} variant="ghost" size="icon" className="rounded-full size-12 p-2 shadow-xl cursor-pointer bg-bg/50">
                    {!isChatOpen ? (
                        <MessageCircle className="size-7"/>
                    ):
                     <ArrowDownCircleIcon className="size-7"/>
                    }
                </Button>
             </div>

            {/*Chat Interface*/}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{opacity:0,scale:0.2,}}
                        animate={{opacity:1,scale:1}}
                        exit={{opacity:0,scale:0.2}}
                        transition={{
                            type: "spring",
                            stiffness: 170,
                            damping: 18,
                        }}
                        className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px] origin-bottom-right"
                    >
                        <Card className="border-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 rounded-r-2xl shadow-second/70 shadow-md ">
                                <CardTitle className="text-lg font-bold">
                                   Neon Cinemas Express Helper
                                </CardTitle>
                                <Button
                                onClick={toggleChat}
                                size={"sm"}
                                variant="ghost"
                                className="px-2 py-0 cursor-pointer"
                                >
                                <X className="size-7"/>
                                    <span className="sr-only">Close chat</span>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[350px] pr-4">
                                    {messages?.length===0 &&
                                    <div className="w-full mt-32 items-center justify-center flex gap-3">
                                       No messages yet.
                                    </div>}
                                    {messages?.map(message => (
                                        <div
                                            key={message.id}
                                            className={`flex mb-2 ${
                                                message.role === 'user' ? 'justify-end' : 'justify-start'
                                            }`}
                                        >
                                            <div
                                                className={`max-w-[75%] rounded-lg px-3 py-2 shadow ${
                                                    message.role === 'user'
                                                        ? 'bg-second  rounded-br-none'
                                                        : 'bg-text text-black rounded-bl-none'
                                                }`}
                                            >
                                            {message.parts.map((part, i) => {
                                                switch (part.type) {
                                                    case 'text':
                                                        return <div key={`${message.id}-${i}`}>{part.text}</div>;
                                                }
                                            })}
                                            </div>
                                        </div>
                                    ))}
                                    {error &&(
                                        <div className="w-full items-center flex justify-center gap-3">
                                            <div>An error occurred.</div>
                                            <Button
                                            className="underline"
                                            onClick={()=>regenerate()}
                                            >
                                                Retry
                                            </Button>
                                        </div>
                                    )}
                                    <div ref={bottomRef} />
                                </ScrollArea>
                             </CardContent>
                            <CardFooter>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        sendMessage({ text: input });
                                        setInput('');
                                    }}
                                    className="flex w-full items-center space-x-2"
                                >
                                    <input
                                        className="flex-1   p-2  border rounded shadow-xl"
                                        value={input}
                                        placeholder="Ask anything about Neon Cinemas."
                                        onChange={e => setInput(e.currentTarget.value)}
                                    />
                                    <Button type="submit" variant="ghost" className="size-10 cursor-pointer" size="icon" disabled={status==="streaming"}>
                                        <Send className="size-6"/>
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>



                    </motion.div>

                )}
            </AnimatePresence>



        </div>
    );
}
export default ChatBot
