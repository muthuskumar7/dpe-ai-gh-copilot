const cache = require('../server/cache');

describe('test cache', () => {
  it('should return the stored value', () => {
    const appCache = cache.appCache;

    appCache.set('myKey', 'my value');

    expect(appCache.get('myKey')).toBe('my value');
  });

  it('should remove the entry after the ttl is expired', () => {
    const myCache = cache.createCache(3); // ttl = 3 seconds
    myCache.set('myKey', 'my value');
    expect(myCache.get('myKey')).toBe('my value');
    setTimeout(() => {
      expect(myCache.get('myKey')).toBe(undefined);
    }, 5000);
  });
});