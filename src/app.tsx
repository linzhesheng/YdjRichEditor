/**
 * app.js
 *
 * 程序的入口
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'mobx-react'
import { configure } from 'mobx'

// 如果依赖第三方UI库的样式，建议去掉sanitize.css的依赖
import "sanitize.css/sanitize.css";

/**
 * 这里开始你的第三方包依赖，包括css
 * Example
 *
 * import "antd/dist/antd.css"
 */
import "antd/dist/antd.css"

// app global style
import 'app.scss'

// Import root app
import App from "containers/shared/App";

import * as store from 'store'

// 开启mobx严格模式
configure({ enforceActions: true })

const MOUNT_NODE = document.getElementById("root");

const render = (Component) => {
    ReactDOM.render(
        <Provider {...store}>
            <Component />
        </Provider>,
        MOUNT_NODE
    );
};

render(App)

if (module.hot) {
    // 热更新React Components
    // module.hot.accept不支持动态的依赖
    // 必须是编译时定义的常量
    module.hot.accept(["containers/shared/App"], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(require('containers/shared/App').default);
    });
}

// TODO: 待验证
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === "production") {
    // tslint:disable-next-line:no-var-requires
    require("offline-plugin/runtime").install(); // eslint-disable-line global-require
}
