module.exports = {
  apps: [
    {
      name: "zhengche-platform",
      script: "backend/server.js",
      cwd: __dirname + "/..",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        ADMIN_USER: "admin",
        ADMIN_PASSWORD: "change-this-password",
      },
      max_memory_restart: "300M",
      error_file: "logs/pm2-error.log",
      out_file: "logs/pm2-out.log",
      time: true,
    },
  ],
};
