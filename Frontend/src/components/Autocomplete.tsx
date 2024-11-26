import { Autocomplete as MUIAutocomplete, TextField } from "@mui/material"
import { PromptDetail } from "../screens/classmate/constants/ai"
interface AutocompleteProps {
	width?: number,
	label: string,
	options: string[],
	freeSolo?: boolean,
	setContent: (content: string) => void,
}
export default function Autocomplete({ width, label, options, freeSolo = false, setContent }: AutocompleteProps) {
	return <MUIAutocomplete className="muiautocomplete-compact" sx={{ width: width || 120, height: 40, lineHeight: 40 }} disablePortal options={options} freeSolo={freeSolo} onChange={(_, value) => setContent(value as PromptDetail)} renderInput={(params) => <TextField {...params} label={label} />} />
}