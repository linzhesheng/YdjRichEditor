/**
 * <% Title %> Actions
 *
 *  * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    DEMO_TYPE
} from "./constants";

export function demoAction() {
    return {
        type: DEMO_TYPE 
    }
}
