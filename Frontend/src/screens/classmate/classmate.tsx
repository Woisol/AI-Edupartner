import { useEffect, useState } from "react";
import ContentCard, { CardProps } from "../../components/ContentCard";
import { Alert, Button, IconButton, Input } from "@mui/material";
import { getVoiceCVResult } from "../../utils/axios";
import { toast } from "../../utils/toast";
import { Close, CopyAll, Send } from "@mui/icons-material";
import useAIContent from "./hooks/useAIContent";
import { testChatMsg } from "./constants/test";
import ChatBubble from "./components/chatBubble";
import { openai_send } from "../../utils/ai";

export default function Classmate() {
	const [dropping, setDropping] = useState(false)

	const [voiceFile, setVoiceFile] = useState<File | null>(null);
	const [originText, setOriginText] = useState("");
	const [chatInput, setChatInput] = useState("");

	const { conclusion, setConclusion, key, setKey, extra, setExtra, question, setQuestion, chatMsg, setChatMsg } = useAIContent();

	// TODO to delete
	// useEffect(() => { setChatMsg(testChatMsg) }, [])

	function handleDrop(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault()
		setDropping(true)
		const file = event.dataTransfer.files[0]
		// if (file.type !== 'audio') {
		// 	toast.error('请选择音频文件！');
		// }
		setVoiceFile(file)
		const reader = new FileReader()
		reader.readAsArrayBuffer(file)
		reader.onload = (e) => {
			if (file.type.startsWith('audio')) {
				// data = JSON.parse(e.target!.result as string)
				// if (typeof data === typeof keywordDatas) {
				// setOriginText(e.target!.result as string);
				getVoiceCVResult(e.target!.result!, file.name, setOriginText);

			}
			else if (file.type.startsWith('text')) {
				const textDecoder = new TextDecoder('utf-8')
				const text = textDecoder.decode(e.target!.result as ArrayBuffer)
				setOriginText(text);
			}

			setDropping(false)
			// }

		}
	}
	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setDropping(true)
	}

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setDropping(false)
	}

	function handleChatSend() {
		openai_send(chatInput, chatMsg, setChatMsg)
		setTimeout(() => {
			setChatInput('')
		}, 100)
		// !防止额外输入空格
	}

	return (
		<div className="w-screen h-screen relativ bg-[#FAFAFA]">
			{originText ?
				<>
					<div className="w-[800px h-[600px size-[calc(100%-150px)] mx-auto p-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-whit rounded-2xl shadow-2xl flex gap-2">
						<div className="flex-1 shrink-0 max-w-[800px]">
							<ContentCard title="课堂原文" content={[
								<video className={`w-full h-16 mb-4 ${voiceFile?.name ? '' : 'hidden'}`} src={URL.createObjectURL(voiceFile!)} controls />, <div className="pt-3 border-gray-400 border-t-2">{originText}</div>
							]} action={[
								<IconButton className="!ml-auto" size="large" onClick={() => { navigator.clipboard.writeText(originText); toast.success('已复制到剪贴板') }}><CopyAll /></IconButton>
							]} regenerate={false}></ContentCard>
						</div>
						<div className="flex-1 shrink-0 max-w-[800px] flex flex-col">
							{([{ title: 'AI总结', content: conclusion }, { title: '重难点推断', content: key }, { title: '扩展', content: extra }, { title: '小测试', content: question }] as CardProps[]).map((card, index) => <ContentCard key={index} {...card} />)}
						</div>
						<div className="flex-1 shrink-0 max-w-[800px] relative">
							<ContentCard title="AI对话" content={
								<div className="w-full h-full h-[calc(100%-80px)">
									<div className="h-full pb-[100px] flex flex-col gap-4 items-start overflow-y-auto">
										{chatMsg.map((msg, index) => <ChatBubble key={index} chatMsg={msg} />)}
									</div>
									<div className="w-[calc(100%-2rem)] h-[50px absolute mt-auto left-4 bottom-4 flex items-end backdrop-blur-sm bg-white bg-opacity-30">
										<Input placeholder="还有什么问题吗？" multiline className="w-full h-full" value={chatInput} onChange={(e) => { setChatInput(e.target.value) }} onKeyDown={(e) => { if (e.key === 'Enter' && e.shiftKey === false) { handleChatSend(chatInput) } }} />
										<IconButton className="size-[50px] !rounded-md" onClick={handleChatSend}><Send /></IconButton>
									</div>
								</div>} action={[<Button className="!ml-auto" variant="contained" size="large" onClick={() => { setChatMsg([]); setChatInput(''); }}>开始新对话</Button>]} regenerate={false}></ContentCard>
						</div>
					</div>
					<Button variant="contained" size="large" className="!fixed right-3 bottom-3" onClick={() => { setOriginText(""); setVoiceFile(null); }}><Close />清空</Button>
				</> :
				<>
					<div className={`size-[400px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl `} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
						{!originText && <h2 className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-nowrap font-bold pointer-events-none transition-all duration-300 ${dropping ? 'opacity-0' : 'opacity-100'}`}>将音频或文本文件拖拽到此</h2>
						}
					</div>
					<div className={`size-[400px] bg-gray-700 rounded-2xl pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-300 ${dropping ? 'opacity-30' : 'opacity-0'}`}>
						{/* @ts-expect-error outer svg */}
						<svg t="1730803416439" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4258" width="200" height="200"><path d="M842.666667 285.866667l-187.733334-187.733334c-14.933333-14.933333-32-21.333333-53.333333-21.333333H234.666667C194.133333 74.666667 160 108.8 160 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666666V337.066667c0-19.2-8.533333-38.4-21.333333-51.2z m-44.8 44.8H618.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V140.8l189.866667 189.866667z m-8.533334 554.666666H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h309.333333V320c0 40.533333 34.133333 74.666667 74.666667 74.666667h181.333333V874.666667c0 6.4-4.266667 10.666667-10.666667 10.666666z" fill="#eee" p-id="4259"></path><path d="M618.666667 586.666667h-74.666667V512c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v74.666667H405.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h74.666667V725.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-74.666666H618.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" fill="#eee" p-id="4260"></path></svg>
					</div>

				</>}
		</div>)
}