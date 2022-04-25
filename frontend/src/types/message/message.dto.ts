export interface MessageDto {
	id: number;
	text: string;
	senderId: number;
	conversationId: number;
	isRead: boolean;
}
