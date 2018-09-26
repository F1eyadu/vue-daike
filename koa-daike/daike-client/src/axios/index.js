import apiLogin from './interface/login'
import apiRegister from './interface/register'
import apiSubstitute from './interface/substitute'
import apiMIne from './interface/mine'
import apiPublic from './interface/public'
const install = Vue => {
    if(install.installed) {
        return
    }
    install.installed = true

    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return Object.assign(
                    {},
                    apiLogin,
                    apiRegister,
                    apiSubstitute,
                    apiMIne,
                    apiPublic
                )
            }
        }
    })
}

export default install