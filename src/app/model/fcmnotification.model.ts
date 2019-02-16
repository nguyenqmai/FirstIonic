export interface FcmNotification {
    key: string;
    title: string;
    label: string;
    tap: boolean;
    body: string;

    receivedTime: Date;
    topic: string;
}