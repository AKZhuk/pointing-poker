export const SERVER_URL = `http://${process.env.BASE_URL}`;

export async function checkRoom(roomKey: string): Promise<boolean> {
  const resp = await fetch(`${SERVER_URL}/checkRoom`, {
    method: 'POST',
    body: JSON.stringify({ roomKey }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (resp.status === 200) return true;

  const data = await resp.json();
  console.error(data.message);
  return false;
}

export async function uploadAvatar(file: File, userId: string): Promise<{ [key: string]: string }> {
  const data = new FormData();
  data.append('img', file);
  data.append('userId', userId);
  const resp = await fetch(`${SERVER_URL}/uploadAvatar`, {
    method: 'POST',
    body: data,
  });
  return resp.json();
}

export async function deleteAvatar(userId: string): Promise<void> {
  const resp = await fetch(`${SERVER_URL}/deleteAvatar`, {
    method: 'DELETE',
    body: JSON.stringify({ userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (resp.status !== 200) {
    const data = await resp.json();
    console.error(data.message);
  }
}
