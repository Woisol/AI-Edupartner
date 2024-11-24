import { Card, CardContent, CardHeader } from "@mui/material";

export interface CardProps {
	title: string;
	content: string;
}
export default function ContentCard({ title, content }: CardProps) {
	return (
		<Card variant="outlined" style={{ width: "100%", height: "100%", flex: 1, borderRadius: '10px' }}>
			<CardHeader className="!bg-blue-400" title={title} />
			<CardContent className="whitespace-pre-wrap max-h-[calc(100%-56px)] overflow-y-auto">{content}</CardContent>
		</Card>
	)
}