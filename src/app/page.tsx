'use client';

import { useState } from 'react';
import { fetchMinecraftUser } from '../../network/user-info';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState<{
    user: { id: string; name: string; } | null;
    errorMessage: string | null;
  }>({
    user: null,
    errorMessage: null
  });

  const handleSearch = async () => {
    if (!inputValue.trim()) return;

    setLoading(true);
    const result = await fetchMinecraftUser(inputValue);
    setUserState(result);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 搜索区域 */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="请输入 Minecraft 用户名"
              className="input input-bordered w-full sm:w-96"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? '搜索中...' : '搜索'}
            </button>
          </div>
        </div>

        {/* 用户信息卡片 */}
        <div className="mb-8">
          <div className="card card-border bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold mb-4">用户信息</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">姓名：</span>
                  <span className="text-base-content/80">
                    {loading ? '加载中...' :
                     userState.errorMessage ? userState.errorMessage || '查询失败' :
                     userState.user?.name || '-'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">UUID：</span>
                  <span className="text-base-content/80">
                    {loading ? '加载中...' :
                     userState.errorMessage ? userState.errorMessage || '查询失败' :
                     userState.user?.id || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 内容卡片 */}
        <div className="tabs tabs-lift">
          <input type="radio" name="content_tabs" className="tab" aria-label="头像" defaultChecked/>
          <div className="tab-content bg-base-100 border-base-300 p-6">
            {userState.user && !userState.errorMessage && (
              <div className="flex flex-col items-center gap-4">
                <img 
                  src={`https://mc-heads.net/avatar/${userState.user.id}/100`}
                  alt={`${userState.user.name}的头像`}
                  className="rounded-lg"
                />
                <p className="text-sm text-base-content/80">点击头像查看大图</p>
              </div>
            )}
            {loading && <p className="text-center">加载中...</p>}
            {userState.errorMessage && <p className="text-center text-error">{userState.errorMessage}</p>}
            {!userState.user && !loading && !userState.errorMessage && <p className="text-center">请输入用户名搜索</p>}
          </div>

          <input type="radio" name="content_tabs" className="tab" aria-label="身份证"/>
          <div className="tab-content bg-base-100 border-base-300 p-6">
            {userState.user && !userState.errorMessage && (
              <div className="flex flex-col items-center gap-4">
                <img 
                  src={`https://mc-heads.net/body/${userState.user.id}/100`}
                  alt={`${userState.user.name}的皮肤`}
                  className="rounded-lg"
                />
                <p className="text-sm text-base-content/80">点击皮肤查看大图</p>
              </div>
            )}
            {loading && <p className="text-center">加载中...</p>}
            {userState.errorMessage && <p className="text-center text-error">{userState.errorMessage}</p>}
            {!userState.user && !loading && !userState.errorMessage && <p className="text-center">请输入用户名搜索</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
