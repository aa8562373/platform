目录结构      
app          
    - src        
        - js    
            - global(公共)    
            - page(相关脚本和模块)    
        - css    
             - global(公共)    
             - page(相关样式)    
        - img    
             - icon    
             - 图片    
    - views     
        - layouts(main主模板)    
            - main.handlebars    
            - partials(公共模块)       
             page    
        - page(相关逻辑页面)    
    - routes     
        - index(业务路由)    


相关待补充    


npm install     

node install pm2    
   
export NODE_URL="接口地址"    
 
export NODE_PORT="端口"    



   
pm2 start app.js     


端口export NODE_PORT="8080"    
接口export NODE_URL="192.168.0.247"     