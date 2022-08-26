import { toast } from 'react-toastify';
toast.configure();


export default (message,type) => { 
    if(message != undefined) {
        if(type == 'success'){
            toast.success(message, {
                theme: 'colored',
              });
        }else{
            toast.error(message, {
                theme: 'colored'
              });
        }
    }
}
