import message from './message.vue'

const Message ={}
Message.install  = function(Vue){
    let messageConstructor = Vue.extend(message)
    let instance =new messageConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    const $alert=Vue.prototype.$alert = msg => {
        instance.type = 'alert';
        instance.msg = msg;
        instance.isShow = true;
    };
    $alert.success = msg =>{
        instance.type = 'success';
        instance.msg = msg;
        instance.isShow = true;
    }
    $alert.error = msg =>{
        instance.type = 'error';
        instance.msg = msg;
        instance.isShow = true;
    }
    Vue.prototype.$confirm = (msg, success, cancel) => {
        instance.type = 'confirm';
        instance.msg = msg;
        instance.isShow = true;
        if(typeof success !== 'undefined') {
            instance.success = success;
        }
        if(typeof cancel !== 'undefined') {
            instance.cancel = cancel;
        }
    }
  
}


export default Message

