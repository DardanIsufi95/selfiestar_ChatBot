module.exports = {
    apps : [{
      name:'Admin',
      script: './web/app_adminpanel.js',
      exec_mode : "cluster",
      autorestart:true
    },{
      name:'APP',
      script: './app/bin/www',
      exec_mode : "cluster",
      autorestart:true
    },{
        name:'Proxy',
        script: './proxy/app.js',
        exec_mode : "cluster",
        autorestart:true
      }]
  };