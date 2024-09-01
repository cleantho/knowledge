export const baseApiUrl = 'http://localhost:3000'
export const userKey = 'knowledge-user'
export const normalExit = 'normal-exit'

export function showError(toast, e) {        
    if (e && e.response && e.response.data) {
        toast.defaultError(e.response.data)
    } else if (typeof e === 'string') {
        toast.defaultError(e)
    } else {
        toast.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }
