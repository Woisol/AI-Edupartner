import { useState } from "react";
import ContentCard, { CardProps } from "./components/Card";
import { Alert, Card } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const cardsProps: CardProps[] = [
	{ title: "Card 1", content: "This is the content of card 1." },
	{ title: "Card 2", content: "This is the content of card 2." },
	{ title: "Card 3", content: "This is the content of card 3." },
]

export default function App() {
	const [dropping, setDropping] = useState(false)
	const [voiceFile, setVoiceFile] = useState("");

	function handleDrop(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault()
		setDropping(true)
		const file = event.dataTransfer.files[0]
		// if (file.type !== 'audio') {
		// 	toast.error('请选择音频文件！');
		// }
		const reader = new FileReader()
		reader.readAsText(file)
		reader.onload = (e) => {
			// let data
			// try {
			// 	data = JSON.parse(e.target!.result as string)
			// } catch (e) {
			// 	if (e instanceof SyntaxError) {
			// 		alert('文件内容不是JSON格式，请确认放入了程序输出的文件！')
			// 		setDropping(false)
			// 		return;
			// 	}
			// }
			// // if (typeof data === typeof keywordDatas) {
			// // !哇趣，补全出来的类型检查！
			// if (data && Object.values(data).every(v => Array.isArray(v) && v.every(d => typeof d === 'object' && 'line' in d && 'count' in d))) {
			// 	setVoiceFile(data!)
			// }
			// else { alert('数据格式错误，请确认放入了程序输出的文件！') }
			const formData = new FormData();
			formData.append('file', e.target!.result as string);
			formData.append('language', 'zh');
			formData.append('model', 'base');
			formData.append('response_format', 'json');
			axios.post('http://127.0.0.1:9977/api', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
				.then(res =>
					console.log(res))
				.catch(err => {
					if (err) console.error(err)
				})
			// axios.post('http://127.0.0.1:9977/api', { "language": "zh", "model": "tiny", "response_format": "text", 'file': e.target!.result },).then(res => console.log(res)).catch(err => console.error(err))

			setDropping(false)
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

	return (
		<div className="w-screen h-screen relative bg-[#FAFAFA]">
			{voiceFile ?
				<div className="w-[800px] h-[600px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl flex">
					<div className="flex-1">
						<ContentCard title="课堂原文" content="这是一段课堂原文。"></ContentCard>
					</div>
					<div className="flex-1">
						{[{ title: '', content: '' } as CardProps].map((card, index) => <Card key={index} {...card} />)}
					</div>
					<div className="flex-1">
						<ContentCard title="课堂翻译" content="这是一段课堂翻译。"></ContentCard>
					</div>

				</div> :
				<>
					<div className={`size-[400px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl `} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
						{!voiceFile && <h2 className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-nowrap font-bold pointer-events-none transition-all duration-300 ${dropping ? 'opacity-0' : 'opacity-100'}`}>将音频拖拽到此</h2>
						}
					</div>
					<div className={`size-[400px] bg-gray-700 rounded-2xl pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-300 ${dropping ? 'opacity-30' : 'opacity-0'}`}>
						{/* @ts-expect-error outer svg */}
						<svg t="1730803416439" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4258" width="200" height="200"><path d="M842.666667 285.866667l-187.733334-187.733334c-14.933333-14.933333-32-21.333333-53.333333-21.333333H234.666667C194.133333 74.666667 160 108.8 160 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666666V337.066667c0-19.2-8.533333-38.4-21.333333-51.2z m-44.8 44.8H618.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V140.8l189.866667 189.866667z m-8.533334 554.666666H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h309.333333V320c0 40.533333 34.133333 74.666667 74.666667 74.666667h181.333333V874.666667c0 6.4-4.266667 10.666667-10.666667 10.666666z" fill="#eee" p-id="4259"></path><path d="M618.666667 586.666667h-74.666667V512c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v74.666667H405.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h74.666667V725.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-74.666666H618.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" fill="#eee" p-id="4260"></path></svg>
					</div>

				</>}
		</div>)
}