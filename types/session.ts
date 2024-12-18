export interface Session {
  id: string;
  materialId: string; // Changed from lessonId
  dateTime: Date;
  meetingUrl: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export function generateMeetingUrl(): string {
  // Simulate generating a meeting URL
  const meetingId = Math.random().toString(36).substring(7);
  return `https://meet.jitsi.si/${meetingId}`;
}
