import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import Markdown from "react-markdown";

export interface CardProps {
	title: string;
	content: string | JSX.Element | JSX.Element[];
	action?: JSX.Element | JSX.Element[],
	regenerate?: boolean,
	onRegenerate?: () => void
	defautlExpanded?: boolean
}
// export function ContentCardActionButton() {
// 	return (
// 		<Button variant=""
// 	)
// }
export default function ContentCard({ title, content, action, regenerate = true, onRegenerate, defautlExpanded = true }: CardProps) {
	return (
		<Accordion className={`w-full ${defautlExpanded && 'h-full'} flex flex-col rounded-2xl shadow-md overflow-hidden`} defaultExpanded={defautlExpanded}>
			{/* <div className=""> */}

			<AccordionSummary>

				<div className="w-full h-12 px-4 py- text-white rounded-2xl bg-blue-400 flex gap-2 items-center justify-end flex-wrap">
					<h2 className="text-xl font-bold self-center mr-auto">{title}</h2>
					{/* <div className="ml-auto flex gap-2 items-center"> */}
					{/* </div> */}
				</div>
			</AccordionSummary>
			<AccordionActions >
				{action}
				{regenerate && <Button className="!self-en" variant="contained" size="small" onClick={onRegenerate}>重新生成</Button>}

			</AccordionActions>
			<AccordionDetails>
				<div className="max-h-[calc(100%-6rem)] min-h-32 flex- p-5 overflow-y-auto whitespace-pre-wrap">
					{typeof content === "string" ?
						<Markdown>
							{content}
						</Markdown> :
						content
					}
				</div>
			</AccordionDetails>
			{/* </div> */}

		</Accordion>
		// <Card variant="outlined" style={{ width: "100%", height: "100%", flex: 1, borderRadius: '10px' }}>
		// 	<CardHeader className="!bg-blue-400" title={title} />
		// 	<CardContent className="whitespace-pre-wrap max-h-[calc(100%-56px)] overflow-y-auto">{content}</CardContent>
		// </Card>
	)
}