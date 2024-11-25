// API URL
// https://free.v36.cm
// API KEY
// sk-glEnRfku3Nr9Ce2F4c5bB067Ab58422dB87380A6Be66C05b

import OpenAI from "openai";
import { ChatMessage } from "../types/ai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { prompt_conclusion, prompt_extra, prompt_key, prompt_origin, prompt_ques, PromptConclusion, PromptExtra, PromptKey, PromptQues } from "../screens/classmate/constants/ai";

let bgChats: ChatMessage[] = [];
const client = new OpenAI({
	baseURL: 'https://free.v36.cm/v1',
	apiKey: 'sk-glEnRfku3Nr9Ce2F4c5bB067Ab58422dB87380A6Be66C05b',
	// TODO handle
	dangerouslyAllowBrowser: true,
})
// const chatCompletion
async function openai_send(msg: string, curMsg: ChatMessage[], setChatMsg: (msg: ChatMessage[]) => void) {
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
async function openai_get(prompt: string, setContent: (content: string) => void) {
	// TODO to delete
	return;

	bgChats = [...bgChats, { role: 'user', content: prompt }];
	const stream = await client.beta.chat.completions.stream({
		model: 'gpt-3.5-turbo',
		messages: bgChats,
		stream: true,
	})
	let output = '';
	stream.on('content', (delta, _snapshot) => {
		output += delta;
		setContent(output);
	})

}
export const aiapi = {
	send: openai_send,
	get: {
		conclude: (setContent: (content: string) => void, promptOptions: PromptConclusion) => { openai_get(prompt_conclusion(promptOptions), setContent) },
		key: (setContent: (content: string) => void, promptOptions: PromptKey) => { openai_get(prompt_key(promptOptions), setContent) },
		extra: (setContent: (content: string) => void, promptOptions: PromptExtra) => { openai_get(prompt_extra(promptOptions), setContent) },
		ques: (setContent: (content: string) => void, promptOptions: PromptQues) => { openai_get(prompt_ques(promptOptions), setContent) },
	},
	init: (originText: string) => { openai_get(prompt_origin({ originText }), () => { }) }
}