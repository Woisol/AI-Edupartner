import { Card, CardContent, CardHeader } from "@mui/material";

export interface CardProps {
	title: string;
	content: string;
}
export default function ContentCard({ title, content }: CardProps) {
	return (
		<Card variant="elevation" style={{ width: "100%", height: "100%", flex: 1 }}>
			<CardHeader>{title}</CardHeader>
			<CardContent>{content}</CardContent>
		</Card>
	)
}