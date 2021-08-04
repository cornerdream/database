let baseUrl = "";
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = "http://192.168.1.218:8001"  //开发环境url
        break
    case 'production':
        baseUrl = ""   //生产环境url
        break
}
 
export default baseUrl;

