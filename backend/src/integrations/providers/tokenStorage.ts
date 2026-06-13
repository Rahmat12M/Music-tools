interface StoredToken {
  token: string;
  userId: string;
}
type ProviderName = 'spotify' | `soundcloud`
class TokenStorage {
  private store = new Map<string, StoredToken>();

  private getKey(provider: ProviderName, userId: string) {
    return `auth_token_${provider}_${userId}`;
  }

  save(provider: ProviderName, token: string, userId: string) {
    this.store.set(this.getKey(provider, userId), { token, userId });
  }

  get(provider: ProviderName, userId: string): StoredToken | null {
    return this.store.get(this.getKey(provider, userId)) ?? null;
  }

  remove(provider: ProviderName, userId: string) {
    this.store.delete(this.getKey(provider, userId));
  }

  validate(provider: ProviderName, token: string, userId: string): boolean {
    const stored = this.get(provider, userId);
    if (!stored) return false;
    return stored.token === token;
  }
}

export const tokenStorage = new TokenStorage();

