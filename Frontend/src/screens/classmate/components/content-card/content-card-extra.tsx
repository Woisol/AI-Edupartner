import { useEffect, useState } from "react";
import { aiapi } from "../../../../utils/ai";
import ContentCard from "../../../../components/ContentCard";
import { Fields, FieldsArray, PromptDifficulty } from "../../constants/ai";
import Autocomplete from "../../../../components/Autocomplete";
import { FormControlLabel, Switch } from "@mui/material";

export default function ContentCardExtra() {
	const [content, setContent] = useState('');
	const [direction, setDirection] = useState<Fields>(['']);
	const [withExplaintion, setWithExplaintion] = useState(true);
	const [difficulty, setDifficulty] = useState<PromptDifficulty>('常见');
	function generate() {
		aiapi.get.extra(setContent, { field: direction, withExplaintion, difficulty })
	}
	useEffect(() => {
		setTimeout(() => {
			generate();
		}, 2000)
	}, [])
	return (
		<ContentCard title="课外拓展" content={content} action={[
			// @ts-expect-error readonly
			<Autocomplete label="课外拓展" options={FieldsArray} setContent={setDirection as (value: string) => void} />,
			<FormControlLabel label='解释' control={<Switch checked={withExplaintion} onChange={(_e, checked) => setWithExplaintion(checked)} />} />,
			<Autocomplete label="难度" options={['简单', '常见', '少见', '专业']} setContent={setDifficulty as (value: string) => void} />
		]} onRegenerate={generate} />
	)
}