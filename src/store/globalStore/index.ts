import { observable, action } from 'mobx'

export class GlobalStore {
    @observable test: IGlobalStore.Test = {
        hello: 'hello mobx!'
    }

    @action
    changeTest = (test: IGlobalStore.Test) => {
        this.test = test
    }
}

export default new GlobalStore()
