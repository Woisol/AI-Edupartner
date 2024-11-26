import { useEffect, useState } from "react";
import { aiapi } from "../../../../utils/ai";
import ContentCard from "../../../../components/ContentCard";
import { PromptNum } from "../../constants/ai";
import Autocomplete from "../../../../components/Autocomplete";

export default function ContentCardKey() {
	const [content, setContent] = useState('');
	const [num, setNum] = useState<PromptNum>('一般多');
	function generate() {
		aiapi.get.key(setContent, { num })
	}
	useEffect(() => {
		setTimeout(() => {
			generate();
		}, 1000)
	}, [])
	return (
		<ContentCard title="重难点" content={content} action={[
			<Autocomplete label="数量" options={['最少', '较少', '一般多', '较多', '最多']} setContent={setNum as (value: string) => void} />
		]} onRegenerate={generate} defautlExpanded={false} />
	)
}