import { useEffect, useState } from "react";
import { aiapi } from "../../../../utils/ai";
import ContentCard from "../../../../components/ContentCard";
import { FieldsArray, PromptDifficulty, PromptNum } from "../../constants/ai";
import Autocomplete from "../../../../components/Autocomplete";
import { CheckBox } from "@mui/icons-material";
import { FormControl, FormControlLabel, Switch } from "@mui/material";

export default function ContentCardExtra() {
	const [content, setContent] = useState('');
	const [direction, setDirection] = useState<PromptNum>('一般多');
	const [withExplaintion, setWithExplaintion] = useState(true);
	const [difficulty, setDifficulty] = useState<PromptDifficulty>('常见');
	function generate() {
		aiapi.get.extra(setContent, { direction, withExplaintion, difficulty })
	}
	useEffect(() => {
		generate();
	}, [])
	return (
		<ContentCard title="课外拓展" content={content} action={[
			<Autocomplete label="课外拓展" options={FieldsArray} setContent={setDirection as (value: string) => void} />,
			<FormControlLabel label='解释' control={<Switch checked={withExplaintion} onChange={(_e, checked) => setWithExplaintion(checked)} />} />,
			<Autocomplete label="难度" options={['简单', '常见', '少见', '专业']} setContent={setDifficulty as (value: string) => void} />
		]} onRegenerate={generate} />
	)
}