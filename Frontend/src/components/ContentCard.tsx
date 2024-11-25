import { Button, Card, CardContent, CardHeader } from "@mui/material";

export interface CardProps {
	title: string;
	content: string | JSX.Element | JSX.Element[];
	action?: JSX.Element | JSX.Element[],
	regenerate?: boolean,
	onRegenerate?: () => void
}
// export function ContentCardActionButton() {
// 	return (
// 		<Button variant=""
// 	)
// }
export default function ContentCard({ title, content, action, regenerate = true, onRegenerate }: CardProps) {
	return (
		<div className="size-full flex flex-col rounded-2xl shadow-md overflow-hidden">
			<div className="w-full h-20 p-5 rounded-2xl bg-blue-400 flex gap-2 items-center flex-wrap">
				<h2 className="text-xl font-bold">{title}</h2>
				{action}
				{regenerate && <Button className="!self-en !ml-auto" variant="contained" size="small" onClick={onRegenerate}>重新生成</Button>}
			</div>
			<div className="max-h-[calc(100%-5rem)] flex-1 p-5 overflow-y-auto whitespace-pre-wrap">
				{content}
			</div>
		</div>
		// <Card variant="outlined" style={{ width: "100%", height: "100%", flex: 1, borderRadius: '10px' }}>
		// 	<CardHeader className="!bg-blue-400" title={title} />
		// 	<CardContent className="whitespace-pre-wrap max-h-[calc(100%-56px)] overflow-y-auto">{content}</CardContent>
		// </Card>
	)
}