let store = null;
const helpers = {
    setStore: newStore => {
        store = newStore;
    },
    getStore: () => {
        return store.getState()
    },
    updateState: data => {
        store.dispatch(data);
    },
}

export default helpers;