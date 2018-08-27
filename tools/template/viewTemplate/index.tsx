import * as React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import injectReducer from "components/ReducerInjector";
import injectSaga from "components/SagaInjector";
import { createStructuredSelector } from "reselect";

import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";
import * as actions from "./actions";

import * as styles from "./style.scss";

interface IP {
    demoProps: any
}

class <% Title %> extends React.PureComponent<IP> {
    render() {
        return <div>
            <h1>Hello World!</h1>
        </div>;
    }
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = createStructuredSelector({
    // TODO: add Selector
});

const withReducer = injectReducer({ key: "<% title %>", reducer });
const withSaga = injectSaga({ key: "<% title %>", saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(<% Title %>);
