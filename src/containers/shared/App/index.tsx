/**
 *
 * App
 *
 * 这个组件是每个页面的最外层骨架，所以这里的代码只能存放所有页面公有的， 比如（导航）或者路由
 * 切勿在其他组件引用
 */

import * as React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import YdjRichEditor from '../../views/YdjRichEditor'

const AppWrapper = props => (
    <div><YdjRichEditor />{props.children}</div>
);

export default function App(props) {
    return (
        <AppWrapper>
            <Router>
                <Switch>
                    
                </Switch>
            </Router>
        </AppWrapper>
    );
}
