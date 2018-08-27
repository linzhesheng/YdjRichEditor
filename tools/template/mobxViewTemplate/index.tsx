import * as React from "react";
import { observer } from 'mobx-react'

import * as styles from "./style.scss";

interface IP {
    demoProps: any
}

@observer
class <% Title %> extends React.Component<IP> {
    render() {
        return <div>
            <h1>Hello World!</h1>
        </div>;
    }
}

export default <% Title %>;
