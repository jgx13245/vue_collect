import Vue from 'vue'

/**
 * app 是否与 web 建立链接
 */
export const APP_JS_BRIDGE_CONNECT = 'connect'

export const eventBus = new Vue()