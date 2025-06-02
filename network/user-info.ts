'use server';

interface MinecraftUser {
  id: string;   // 用户 UUID
  name: string; // 当前用户名
}

interface UserInfoState {
  user: MinecraftUser | null;
  errorMessage: string | null;
}

export async function fetchMinecraftUser(username: string): Promise<UserInfoState> {
  'use server';
  if (!username.trim()) {
    return {
      user: null,
      errorMessage: '用户名不能为空'
    };
  }

  try {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username.trim())}`);
    const data = await response.json();

    if (!response.ok) {
      return {
        user: null,
        errorMessage: data.error || response.statusText
      };
    }

    return {
      user: data as MinecraftUser,
      errorMessage: null
    };
  } catch (error) {
    console.error('获取 Minecraft 用户信息失败:', error);
    return {
      user: null,
      errorMessage: error instanceof Error ? error.message : '获取用户信息失败'
    };
  }
}
