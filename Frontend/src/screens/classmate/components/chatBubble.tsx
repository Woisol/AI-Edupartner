import { ChatMessage } from "../../../types/ai";

export default function ChatBubble({ chatMsg }: { chatMsg: ChatMessage }) {
	return (
		<div className={`w-fit p-3 rounded-xl shadow-sm ${chatMsg.role === 'user' ? 'bg-blue-400 text-white self-end' : 'bg-white'}`}>
			<span className="">{chatMsg.content}</span>
		</div>
	)
}