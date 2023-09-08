import { customerSupportAgent } from '../../agents/customerSupportAgent';
import OpenAI from 'openai';


export default defineEventHandler( async (event) => {
  const body = await readBody(event)
  // console.log(body);
  const {OPEN_API_KEY} = useRuntimeConfig()
  const openai = new OpenAI({apiKey: OPEN_API_KEY});

  const completion = await openai.chat.completions.create({
    messages: body.message || [],
    model: "gpt-3.5-turbo",
    temperature: body.temperature || 1,
    ...customerSupportAgent(body)
  });

  return completion.choices[0]
})
