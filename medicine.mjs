import OpenAI from "openai";
import { createInterface } from "node:readline";

const openai = new OpenAI({
  apiKey: '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'
});

const createChatGPTCompletion = (messages) => openai.chat.completions.create({
  messages,
  model: "gpt-4",
  temperature: 1,
  max_tokens: 1024
})

async function main() {
  const initialMessages = [
    { role: "system", content: "You are an expert in pshychology field. Your answers are short and contentful" },
    { role: "user", content: "Hi. I am shy. I am afraid of public speech. My whole career depends on the speech tommorow. Please, help me. Ask me as many questions as you need" },
  ];
  const completion = await createChatGPTCompletion(initialMessages);

  console.log(completion.choices[0].message.content);
  console.log('---end of response---');

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let userAnswer;

  readline.question(`What's your answer? `, async (answer) => {
    userAnswer = answer;

    const completion2 = await createChatGPTCompletion([
      ...initialMessages,
      completion.choices[0].message,
      { role: "user", content: `${userAnswer}. Please give me a single advice` }
    ])

    console.log(completion2.choices[0].message.content);

    readline.close();
  });

}

main();