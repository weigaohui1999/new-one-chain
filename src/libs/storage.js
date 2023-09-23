class StorageClient {
  // 时，分，秒，毫秒。共计存储时间，默认3小时
  clearTime = 3 * 60 * 60 * 1000;
  // 存储前置名称
  lock = "";
  // 存储类型
  storage = null;

  constructor(options) {
    this.storage = options.storage;
    this.lock = options.lock;
    this.clearTime = options.clearTime;
  }

  /**
   * @description 处理存储数据的前缀
   * @param {key}
   */
  GetKey(key) {
    return `${this.lock}${key}`.toUpperCase();
  }

  /**
   * @description 存储值
   * @param {key, value, expire: number }
   * */
  set(key, value, expire = this.clearTime) {
    this.storage.setItem(
      this.GetKey(key),
      JSON.stringify({
        value,
        expire: Date.now() + expire,
      })
    );
  }
  /**
   * @description 清除值
   * @param {key}
   * */
  remove(key) {
    this.storage.removeItem(this.GetKey(key));
  }

  /**
   * @description 获取值
   * @param {key, def}
   * */
  get(key, def = null) {
    try {
      const data = this.storage.getItem(this.GetKey(key));
      if (data && data.length) {
        const { value, expire } = JSON.parse(data);
        if (expire === null || expire >= Date.now()) {
          return value;
        } else {
          this.remove(key);
        }
      }
    } catch (error) {
      return def;
    }
  }
  /**
   * @description 清空storage
   * */
  clear() {
    this.storage.clear();
  }
}

export default StorageClient;
