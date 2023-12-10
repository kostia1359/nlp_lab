import OpenAI from "openai";
import { createInterface } from "node:readline";

const openai = new OpenAI({
  apiKey: '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'
});
const sentence = 'Drunks could put off the customers';

const createChatGPTCompletion = (messages) => openai.chat.completions.create({
  response_format: {
    type: 'json_object'
  },
  messages,
  model: "gpt-3.5-turbo-1106",
  temperature: 0.2,
  max_tokens: 1024
})

async function main() {
  const initialMessages = [
    { role: "system", content: "I am an expert in the field of computer linguistics and artificial intelligence. My main task is to create constituent grammar" },
    { role: "user", content: `Use following symbols to create grammar: D = determiner, N = noun, NP = noun phrase, Pa = particle, S = sentence, V = Verb, VP = verb phrase. Don't write anyhing except of diagramm in return. Here is my sentence: ${sentence}. Return diagram in json format with tree structure` },
  ];
  const completion = await createChatGPTCompletion(initialMessages);

  console.log(completion.choices[0].message.content);
  console.log('---end of response---');

}

main();