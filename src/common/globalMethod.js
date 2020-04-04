// 全局方法
const handleLocalStorage = (method, key, value) => {
    switch(method) {
        case 'get': {
            let temp = localStorage.getItem(key)
            if (temp) {
                return temp
            } else {
                return false
            }
        }
        case 'set': {
            localStorage.setItem(key, value)
            break
        }
        case 'remove': {
            localStorage.removeItem(key)
            break
        }
        default: {
            return false
        }
    }
}

module.exports = {
    handleLocalStorage
}