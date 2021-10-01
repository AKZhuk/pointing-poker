export const SERVER_URL = `https://${process.env.BASE_URL}`;

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

export async function uploadAvatar(elem: HTMLInputElement, userId: string): Promise<{ [key: string]: string }> {
  const { files } = elem;
  const data = new FormData();
  if (files && files.length > 0) {
    data.append('img', files[0]);
    data.append('userId', userId);
    const resp = await fetch(`${SERVER_URL}/uploadAvatar`, {
      method: 'POST',
      body: data,
    });
    return resp.json();
  }
  return {};
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
