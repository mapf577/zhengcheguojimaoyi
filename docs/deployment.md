# 部署说明

本项目当前是轻量 Node 后端 + 静态官网 + 后台管理系统。

运行入口：

```text
backend/server.js
```

默认端口：

```text
3000
```

## 一、服务器要求

最低要求：

- Node.js 18 或更新版本
- npm
- git
- PM2
- Nginx，推荐用于域名反向代理

PM2 如果没有安装，部署脚本会自动执行：

```text
npm install -g pm2
```

## 二、Linux 部署

上传或登录服务器后执行：

```bash
export APP_DIR=/var/www/zhengcheguojimaoyi
export REPO_URL=https://github.com/mapf577/zhengcheguojimaoyi.git
export BRANCH=main
export PORT=3000
export ADMIN_USER=admin
export ADMIN_PASSWORD='请改成强密码'

bash deploy/deploy-linux.sh
```

如果脚本还没有在服务器本地，可以先 clone：

```bash
git clone https://github.com/mapf577/zhengcheguojimaoyi.git /var/www/zhengcheguojimaoyi
cd /var/www/zhengcheguojimaoyi
bash deploy/deploy-linux.sh
```

部署完成后访问：

```text
http://服务器IP:3000/
http://服务器IP:3000/admin/
```

## 三、Windows 部署

在 PowerShell 中执行：

```powershell
.\deploy\deploy-windows.ps1 `
  -AppDir "C:\zhengche" `
  -RepoUrl "https://github.com/mapf577/zhengcheguojimaoyi.git" `
  -Branch "main" `
  -Port "3000" `
  -AdminUser "admin" `
  -AdminPassword "请改成强密码"
```

## 四、PM2 常用命令

查看进程：

```bash
pm2 list
```

查看日志：

```bash
pm2 logs zhengche-platform
```

重启：

```bash
pm2 restart zhengche-platform
```

停止：

```bash
pm2 stop zhengche-platform
```

保存开机启动状态：

```bash
pm2 save
```

Linux 设置开机启动：

```bash
pm2 startup
```

按命令输出继续执行即可。

## 五、Nginx 反向代理

复制模板：

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/zhengche
```

编辑域名：

```bash
sudo nano /etc/nginx/sites-available/zhengche
```

把：

```text
server_name example.com www.example.com;
```

改成你的域名。

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/zhengche /etc/nginx/sites-enabled/zhengche
sudo nginx -t
sudo systemctl reload nginx
```

然后访问：

```text
http://你的域名/
http://你的域名/admin/
```

## 六、HTTPS

推荐使用 Certbot：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

把 `example.com` 换成你的域名。

## 七、数据和图片目录

数据文件：

```text
backend/data/vehicles.json
backend/data/parts.json
backend/data/inquiries.json
```

上传图片：

```text
backend/uploads/
```

生产环境务必定期备份：

```bash
tar -czf backup-$(date +%F).tar.gz backend/data backend/uploads
```

## 八、更新部署

进入项目目录：

```bash
cd /var/www/zhengcheguojimaoyi
```

拉取并重启：

```bash
git pull --ff-only origin main
npm install --omit=dev
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
```

## 九、安全注意

- 不要使用默认密码 `admin123`。
- 服务器上设置强密码：

```bash
export ADMIN_USER=你的账号
export ADMIN_PASSWORD='强密码'
```

- `.pem`、`.env` 等敏感文件已经被 `.gitignore` 忽略，不要手动提交。
- 当前系统是轻量版 JSON 存储，正式商业上线前建议升级到 PostgreSQL/MySQL。
