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
        PORT: process.env.PORT || "3000",
        ADMIN_USER: process.env.ADMIN_USER || "admin",
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "change-this-password",
        TOKEN_SECRET: process.env.TOKEN_SECRET || "",
        DB_DRIVER: process.env.DB_DRIVER || "json",
        MYSQL_HOST: process.env.MYSQL_HOST || "127.0.0.1",
        MYSQL_PORT: process.env.MYSQL_PORT || "3306",
        MYSQL_DATABASE: process.env.MYSQL_DATABASE || "vehicle_export",
        MYSQL_USER: process.env.MYSQL_USER || "vehicle_export",
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
        DATABASE_URL: process.env.DATABASE_URL || "",
      },
      max_memory_restart: "300M",
      error_file: "logs/pm2-error.log",
      out_file: "logs/pm2-out.log",
      time: true,
    },
  ],
};
