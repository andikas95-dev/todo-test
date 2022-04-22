const initialState = {
  data: [],
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: !state.isLoading };
    case 'fetch_done':
      return { ...state, data: action.payload };
    default:
      throw new Error();
  }
}

export { initialState, reducer };
