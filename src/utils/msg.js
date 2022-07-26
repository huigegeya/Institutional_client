import Vue from "vue";

export function showSuccessMsg(msg, duration = 2000) {
    Vue.toasted.show(msg, {position: 'top-center', duration: duration, theme: 'outline', type: 'success'})
}

export function showInfoMsg(msg, confirmFunc, params) {
    Vue.toasted.show(msg, {
      position: "top-center",
      duration: null,
      type: "info",
      theme: "outline",
      action: [
        {
          text: "取消",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
        {
          text: "确定",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
            confirmFunc(params);
          },
        },
      ],
    });
}

export function showErrorMsg(msg, duration = 2000) {
    Vue.toasted.show(msg, {position: 'top-center', duration: duration, theme: 'outline', type: 'error'})
}