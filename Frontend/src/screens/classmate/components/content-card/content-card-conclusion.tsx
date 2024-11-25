import { useEffect, useState } from "react";
import { aiapi } from "../../../../utils/ai";
import ContentCard from "../../../../components/ContentCard";
import { Fields, FieldsArray, PromptDetail } from "../../constants/ai";
import { TextField } from "@mui/material";
import Autocomplete from "../../../../components/Autocomplete";

export default function ContentCardConclusion() {
	const [content, setContent] = useState('');
	const [field, setField] = useState<Fields>('');
	const [detail, setDetail] = useState<PromptDetail>('简略');
	function generate() {
		aiapi.get.conclude(setContent, { field, detail })
	}
	useEffect(() => {
		generate();
	}, [])
	return (
		<ContentCard title="AI总结" content={content} action={[
			<Autocomplete label="文章领域（填写后更准确）" options={FieldsArray} setContent={setField as (value: string) => void} />,
			<Autocomplete label="详细程度" options={['简略', '较简略', '较详细', '详细']} setContent={setDetail as (value: string) => void} />
		]} onRegenerate={generate} />
	)
}