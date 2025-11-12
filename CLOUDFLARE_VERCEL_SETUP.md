# Cloudflare + Vercel 域名配置指南

## 📋 配置步骤

### 1. 在 Vercel 中添加自定义域名

1. 登录 Vercel Dashboard
2. 进入项目 `skilllinkfe`
3. 点击 **Settings** → **Domains**
4. 添加以下域名：
   - `skilllink.me`
   - `www.skilllink.me`
5. Vercel 会自动验证域名所有权

### 2. 在 Cloudflare 中配置 DNS 记录

#### 方法一：使用 CNAME 记录（推荐）

**根域名配置：**
- 如果 Cloudflare 支持 CNAME Flattening（默认启用）：
  - 类型：`CNAME`
  - 名称：`@` 或 `skilllink.me`
  - 目标：`cname.vercel-dns.com`
  - 代理状态：✅ **已代理**（橙色云朵）
  - TTL：自动

**WWW 子域名配置：**
- 类型：`CNAME`
- 名称：`www`
- 目标：`cname.vercel-dns.com`
- 代理状态：✅ **已代理**（橙色云朵）
- TTL：自动

#### 方法二：使用 A 记录（如果 CNAME 不支持）

如果 Cloudflare 不支持根域名的 CNAME，可以使用以下 A 记录：

**根域名配置：**
- 类型：`A`
- 名称：`@` 或 `skilllink.me`
- IPv4 地址：`76.76.21.21`（Vercel 的 IP，请以 Vercel 实际提供的为准）
- 代理状态：✅ **已代理**（橙色云朵）
- TTL：自动

**WWW 子域名配置：**
- 类型：`CNAME`
- 名称：`www`
- 目标：`cname.vercel-dns.com`
- 代理状态：✅ **已代理**（橙色云朵）
- TTL：自动

### 3. 配置 SSL/TLS 设置

在 Cloudflare 中：

1. 进入 **SSL/TLS** 设置
2. 加密模式选择：**完全（Full）** 或 **完全（严格）（Full Strict）**
3. 确保 **自动 HTTPS 重定向** 已启用
4. 在 **边缘证书** 中确保 SSL 证书已激活

### 4. 删除或修改旧的 DNS 记录

删除或修改以下不正确的记录：
- ❌ A 记录：`skilllink.me` → `216.198.79.1`（如果存在且不正确）
- ✅ 确保 `www` 的 CNAME 指向 `cname.vercel-dns.com` 而不是 `skilllinkfe.vercel.app`

### 5. 等待 DNS 传播

- DNS 更改通常需要 **5-30 分钟** 生效
- 可以在 Cloudflare 的 DNS 页面查看记录状态
- 使用 `dig` 或在线 DNS 检查工具验证：
  ```bash
  dig skilllink.me
  dig www.skilllink.me
  ```

## 🔍 验证配置

### 检查 DNS 记录

```bash
# 检查根域名
dig skilllink.me +short

# 检查 www 子域名
dig www.skilllink.me +short
```

### 检查 SSL 证书

访问 `https://skilllink.me` 和 `https://www.skilllink.me`，确保：
- ✅ 显示绿色锁图标
- ✅ 没有 SSL 证书错误
- ✅ 网站正常加载

## ⚠️ 常见问题

### 问题 1：404 错误

**原因：** 域名未在 Vercel 中添加，或 DNS 记录指向错误

**解决：**
1. 确保在 Vercel 的 Domains 设置中添加了域名
2. 检查 DNS 记录是否正确指向 Vercel
3. 等待 DNS 传播完成

### 问题 2：SSL 证书错误

**原因：** Cloudflare SSL/TLS 模式配置不正确

**解决：**
1. 在 Cloudflare 中设置 SSL/TLS 模式为 **完全（Full）**
2. 等待 SSL 证书自动生成（通常几分钟）

### 问题 3：DNS 记录不生效

**原因：** DNS 缓存或传播延迟

**解决：**
1. 清除浏览器 DNS 缓存
2. 使用 `dig` 命令检查 DNS 记录
3. 等待更长时间（最多 24 小时）

## 📝 当前配置检查清单

- [ ] 在 Vercel 中添加了 `skilllink.me` 域名
- [ ] 在 Vercel 中添加了 `www.skilllink.me` 域名
- [ ] Cloudflare 中配置了正确的 CNAME 或 A 记录
- [ ] 代理状态设置为 **已代理**（橙色云朵）
- [ ] SSL/TLS 模式设置为 **完全（Full）**
- [ ] 删除了旧的、不正确的 DNS 记录
- [ ] 等待 DNS 传播完成
- [ ] 测试访问 `https://skilllink.me` 和 `https://www.skilllink.me`

## 🔗 相关链接

- [Vercel 域名配置文档](https://vercel.com/docs/concepts/projects/domains)
- [Cloudflare DNS 管理文档](https://developers.cloudflare.com/dns/manage-dns-records/)
- [Cloudflare SSL/TLS 设置](https://developers.cloudflare.com/ssl/ssl-modes/)

