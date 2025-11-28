# GitHub SSH 密钥配置说明

## ✅ 密钥已生成

SSH 密钥对已成功生成：
- **私钥**: `~/.ssh/id_ed25519_github`
- **公钥**: `~/.ssh/id_ed25519_github.pub`

## 📋 你的公钥内容

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICYRXI30lRwweHtbz/XSDuvyh9izh809AaFQ+1hUwu7f github-sync
```

## 🔧 添加到 GitHub 的步骤

### 方法一：通过网页添加（推荐）

1. **复制上面的公钥内容**（整行，包括 `ssh-ed25519` 开头）

2. **打开 GitHub 设置页面**：
   - 访问：https://github.com/settings/keys
   - 或：GitHub → 右上角头像 → Settings → SSH and GPG keys

3. **添加新密钥**：
   - 点击 "New SSH key" 按钮
   - **Title**: 填写一个描述（如：`MacBook Pro - 开发机`）
   - **Key**: 粘贴上面复制的公钥内容
   - 点击 "Add SSH key"

4. **验证**：
   ```bash
   ssh -T git@github.com
   ```
   如果看到类似 `Hi username! You've successfully authenticated...` 的提示，说明配置成功！

### 方法二：使用 GitHub CLI（如果已安装）

```bash
gh auth login
# 选择 SSH，然后选择你刚生成的密钥
```

## 🚀 使用方式

配置完成后，你可以使用 SSH URL 克隆和推送代码：

```bash
# 克隆仓库（使用 SSH）
git clone git@github.com:Zazak1/ez2study.git

# 或修改现有仓库的远程地址
git remote set-url origin git@github.com:Zazak1/ez2study.git

# 推送代码
git push origin main
```

## 🔍 测试连接

运行以下命令测试 SSH 连接：

```bash
ssh -T git@github.com
```

成功的话会看到：
```
Hi Zazak1! You've successfully authenticated, but GitHub does not provide shell access.
```

## ⚠️ 注意事项

1. **私钥安全**：不要分享或上传 `id_ed25519_github` 文件（私钥）
2. **公钥可以分享**：公钥（`.pub` 文件）可以安全地添加到 GitHub
3. **权限设置**：确保私钥文件权限正确：
   ```bash
   chmod 600 ~/.ssh/id_ed25519_github
   ```

## 📝 快速复制公钥命令

如果需要重新查看公钥，运行：
```bash
cat ~/.ssh/id_ed25519_github.pub | pbcopy  # macOS 自动复制到剪贴板
# 或
cat ~/.ssh/id_ed25519_github.pub           # 显示公钥内容
```

