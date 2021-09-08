import alert from './alert.vue'

const Alert = {
}
Alert.install=function(Vue){
    let messageConstructor = Vue.extend(alert)
    let instance =new messageConstructor();
    Vue.prototype.$$alert = (type,msg) => {
        instance.type = type;
        instance.msg = msg;
        instance.isShow = true;
        setTimeout(function(){
            instance.isShow = false
        },2000)
    };

}

export default Alert