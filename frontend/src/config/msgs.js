import Vue3Toasity, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    install: (app) => {
        app.use(Vue3Toasity, { autoClose: 3000 })
        const task = {
            defaultSuccess(payload) {
                const msg = payload ? payload : 'Operação realidada com sucesso!'
                toast.success(msg, {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_RIGHT,
                });
            },
            defaultError(payload) {
                const msg = payload ? payload : 'Erro inesperado!'
                toast.error(msg, {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }
        app.config.globalProperties.toasted = task
    }
}
