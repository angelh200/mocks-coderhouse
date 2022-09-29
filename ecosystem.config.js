module.exports = {
  apps : [
    {
      name: "Server1",
      script: "./app.js",
      watch: true,
      env: {
        PORT: 8080
      },
      node_args: "--expose-gc"
    },
    {
      name: "Server2",
      script: "./app.js",
      watch: true,
      env: {
        PORT: 8081
      },
      exec_mode: "cluster",
      instances: 2,
      node_args: "--harmony --expose-gc"
    }
  ]
}
