const actions = {
  init: "INIT",
};

export interface IntitialState {
  artifact: any;
  web3: any;
  accounts: any;
  networkID: any;
  contract: any;
}

const initialState: IntitialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
};

const reducer = (state: IntitialState = initialState, action: any) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
