import { BASE_URL } from './Connect';

export async function checkRoom(roomKey: string): Promise<boolean> {
  const resp = await fetch(`http://${BASE_URL}/checkRoom`, {
    method: 'POST',
    body: JSON.stringify({ roomKey }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (resp.status === 200) return true;
  return false;
}
