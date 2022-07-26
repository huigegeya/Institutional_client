// 在浏览器中缓存数据

export function getLocalData(key) {
    return localStorage.getItem(key)
}

export function setLocalData(key, data) {
    localStorage.setItem(key, data)
}

export function removeLocalData(key) {
    localStorage.removeItem(key)
}

export function getSessionData(key) {
    return sessionStorage.getItem(key)
}

export function setSessionData(key, data) {
    sessionStorage.setItem(key, data)
}

export function removeSessionData(key) {
    sessionStorage.removeItem(key)
}

