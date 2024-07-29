'use client'
import { User } from '@/data/users/User';

export function UserInfo({ user }: { user: User | null }) {
  if (!user) return null;

  return (
    <>
      <h1>{user.currentSeasonName}</h1>
    </>
  );
}