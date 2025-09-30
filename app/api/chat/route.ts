import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import {getCinemaInfo} from "@/app/actions";


export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const cinemaInfo = await getCinemaInfo();

    const systemPrompt: UIMessage = {
        id:'system-init',
        role:"system",
        parts:[{
         type:'text',
         text:`You are part of a customer support chatbot for NeonCinemas, a big cinema chain .Here is the current cinema data:
         ${JSON.stringify(cinemaInfo, null, 2)}
             Greed the customers and tell them how you can help.
             Answer user queries about NeonCinema only .If a user query is outside this scope , respond with something like:
             "I'm sorry, I can only answer questions related to NeonCinemas"
             Please format your responses appropriate. Always ensure responses are structured nice your a customer support chat and easy to read.
             `
        }]
    };
    const allMessages = [systemPrompt,...messages];
    const result = streamText({
        model: google("gemini-2.5-flash-lite"),
        messages: convertToModelMessages(allMessages),
        temperature:0.7,
    });

    return result.toUIMessageStreamResponse();
}