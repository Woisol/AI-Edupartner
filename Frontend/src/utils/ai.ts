// API URL
// https://free.v36.cm
// API KEY
// sk-glEnRfku3Nr9Ce2F4c5bB067Ab58422dB87380A6Be66C05b

import OpenAI from "openai";
import { ChatMessage } from "../types/ai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const client = new OpenAI({
	baseURL: 'https://free.v36.cm/v1',
	apiKey: 'sk-glEnRfku3Nr9Ce2F4c5bB067Ab58422dB87380A6Be66C05b',
	// TODO handle
	dangerouslyAllowBrowser: true,
})
// const chatCompletion
export async function openai_send(msg: string, curMsg: ChatMessage[], setChatMsg: (msg: ChatMessage[]) => void) {
	curMsg = [...curMsg, { role: 'user', content: msg }];
	setChatMsg(curMsg);
	// TODO to delete
	// return;
	const stream = await client.beta.chat.completions.stream({
		model: 'gpt-3.5-turbo',
		messages: curMsg,
		stream: true,
	})
	let output = '';
	stream.on('content', (delta, _snapshot) => {
		output += delta;
		setChatMsg([...curMsg, { role: 'system', content: output }]);
	})
}