module.exports = {
  apps: [
    {
      name: "JCWD010605", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8605,
      },
      time: true,
    },
  ],
};
