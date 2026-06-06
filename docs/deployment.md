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
- MySQL 8.x，生产环境推荐使用

PM2 如果没有安装，部署脚本会自动执行：

```text
npm install -g pm2
```

## 二、Linux 部署

先安装 MySQL：

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl enable --now mysql
```

创建数据库和账号：

```bash
sudo mysql
```

在 MySQL 控制台执行：

```sql
CREATE DATABASE IF NOT EXISTS vehicle_export CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'vehicle_export'@'localhost' IDENTIFIED BY '请改成强数据库密码';
GRANT ALL PRIVILEGES ON vehicle_export.* TO 'vehicle_export'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

项目后端启动时会自动创建数据表。如果需要手动初始化，也可以执行：

```bash
mysql -u vehicle_export -p vehicle_export < database/mysql/schema.sql
```

上传或登录服务器后执行：

```bash
export APP_DIR=/var/www/zhengcheguojimaoyi
export REPO_URL=https://github.com/mapf577/zhengcheguojimaoyi.git
export BRANCH=main
export PORT=3000
export ADMIN_USER=admin
export ADMIN_PASSWORD='请改成强密码'
export TOKEN_SECRET='请改成一串随机长字符'
export CORS_ALLOWED_ORIGINS='https://你的域名,https://www.你的域名'
export SESSION_TTL_MS=86400000
export LOGIN_RATE_LIMIT_WINDOW_MS=900000
export LOGIN_RATE_LIMIT_MAX_ATTEMPTS=5
export LOGIN_RATE_LIMIT_LOCK_MS=900000
export DB_DRIVER=mysql
export MYSQL_HOST=127.0.0.1
export MYSQL_PORT=3306
export MYSQL_DATABASE=vehicle_export
export MYSQL_USER=vehicle_export
export MYSQL_PASSWORD='请改成强数据库密码'

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
  -AdminPassword "请改成强密码" `
  -TokenSecret "请改成一串随机长字符" `
  -CorsAllowedOrigins "https://你的域名,https://www.你的域名" `
  -SessionTtlMs "86400000" `
  -LoginRateLimitWindowMs "900000" `
  -LoginRateLimitMaxAttempts "5" `
  -LoginRateLimitLockMs "900000" `
  -DbDriver "mysql" `
  -MysqlHost "127.0.0.1" `
  -MysqlPort "3306" `
  -MysqlDatabase "vehicle_export" `
  -MysqlUser "vehicle_export" `
  -MysqlPassword "请改成强数据库密码"
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

## 七、数据库、数据和图片目录

生产环境推荐使用 MySQL：

```text
DB_DRIVER=mysql
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=vehicle_export
MYSQL_USER=vehicle_export
MYSQL_PASSWORD=你的数据库密码
```

生产环境建议设置 `CORS_ALLOWED_ORIGINS` 为实际域名，多个域名用英文逗号分隔。后台登录默认按 IP 和用户名限制失败尝试，连续失败达到 `LOGIN_RATE_LIMIT_MAX_ATTEMPTS` 后会在 `LOGIN_RATE_LIMIT_LOCK_MS` 时间内拒绝继续登录。

MySQL 表结构文件：

```text
database/mysql/schema.sql
```

后端会使用 MySQL 表 `app_records` 保存整车、零配件、询盘、字典和 AI 日志。第一次启用 MySQL 时，如果 `app_records` 为空，系统会自动把现有 JSON 文件导入数据库一次。

开发环境不配置 MySQL 时，会继续使用 JSON 文件：

JSON 数据文件：

```text
backend/data/vehicles.json
backend/data/parts.json
backend/data/inquiries.json
backend/data/dictionaries.json
backend/data/ai-logs.json
```

上传图片：

```text
backend/uploads/
```

生产环境务必定期备份：

```bash
mysqldump -u vehicle_export -p vehicle_export > backup-db-$(date +%F).sql
tar -czf backup-uploads-$(date +%F).tar.gz backend/uploads
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
export TOKEN_SECRET='随机长字符串'
export DB_DRIVER=mysql
export MYSQL_PASSWORD='强数据库密码'
```

- `.pem`、`.env` 等敏感文件已经被 `.gitignore` 忽略，不要手动提交。
- 正式商业上线建议使用 MySQL，并定期备份数据库和 `backend/uploads/`。
