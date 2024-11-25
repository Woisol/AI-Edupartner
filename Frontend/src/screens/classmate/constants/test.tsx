import { ChatMessage } from "../../../types/ai";

export const testChatMsg: ChatMessage[] = [
	{ role: 'system', content: '你好，我是OpenAI，很高兴为你服务。' },
	{ role: 'user', content: '你好' },
	{ role: 'system', content: '你好，你是谁？' },
	{ role: 'user', content: '我是学生，想问一下你们班有什么活动吗？' },
	{ role: 'system', content: '我们班有很多活动，比如说数学竞赛、英语竞赛、舞蹈比赛、音乐比赛等等。' },
	{ role: 'user', content: '好的，谢谢！' },
]