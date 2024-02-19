module.exports = {
  apps: [
    {
      name: "app",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy: {
    prod: {
      key: "~/.ssh/id_rsa",
      user: "ubuntu",
      host: ["3.101.71.238"],
      ref: "origin/main",
      repo: "git@github.com:vdenisenko-waverley/gloriagatescare.git",
      path: "/home/ubuntu/tmp-site",
      "post-deploy":
        "npm install && NODE_ENV=production npm run build && pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
};
