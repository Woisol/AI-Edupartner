import axios, { AxiosError } from "axios";
import 'react-toastify/ReactToastify.css'
import { toast } from "./toast";

export function getVoiceCVResult(file: string | ArrayBuffer, fileName: string, setOriginText: (text: string) => void) {
	// !尝试用cuda加速，安装了一堆dll都不得，最后原来还是靠重启()注意有时候环境变量还是不一定马上生效的！你python还是venv
	const formData = new FormData();
	formData.append('language', 'zh');
	formData.append('model', 'small');
	formData.append('response_format', 'text');
	// @ts-expect-erro wrong type
	// formData.append('file', file, file.name);
	// ！只要发送了过一会才反应一直是已经成功了的()，都怪axios的问题跨域甚至跨端口都不行……一直以为是参数问题排查了好久还抓了包服了……
	formData.append('file', new Blob([file]), fileName);
	// formData.append('file', e.target!.result as string);
	toast.info('正在识别中，可能需要较长时间，请耐心等候……');
	axios.post('/api', formData)
		// , { headers: { 'Content-Type': 'multipart/form-data' } }
		.then((res: { data: { code: number, data: string, msg: string } }) => {
			// console.log(res)
			if (res.data.code === 0)
				setOriginText(res.data.data)
			else {
				toast.error('语音识别失败，错误信息:' + res.data.msg);
			}
		})
		.catch((err: AxiosError) => {
			console.log(err.response?.data)
			if (err) console.error(err)
		})
	// axios.post('http://127.0.0.1:9977/api', { "language": "zh", "model": "tiny", "response_format": "text", 'file': e.target!.result },).then(res => console.log(res)).catch(err => console.error(err))

}