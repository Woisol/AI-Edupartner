import { useEffect, useState } from "react";
import { aiapi } from "../../../../utils/ai";
import ContentCard from "../../../../components/ContentCard";
import { PromptDifficulty, PromptNum } from "../../constants/ai";
import Autocomplete from "../../../../components/Autocomplete";

export default function ContentCardQues() {
	const [content, setContent] = useState('');
	const [difficulty, setDifficulty] = useState<PromptDifficulty>('常见');
	function generate() {
		aiapi.get.ques(setContent, { difficulty })
	}
	useEffect(() => {
		generate();
	}, [])
	return (
		<ContentCard title="测验" content={content} action={[
			<Autocomplete label="难度" options={['简单', '常见', '少见', '专业']} setContent={setDifficulty as (value: string) => void} />
		]} onRegenerate={generate} />
	)
}