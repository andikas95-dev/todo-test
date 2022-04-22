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
    case 'add_todo':
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.payload,
            id: Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1),
          },
        ],
      };
    case 'edit_todo':
      const dataPayload = state.data.findIndex(
        item => item.id === action.payload.id
      );

      const newData = state.data;

      if (dataPayload !== -1) {
        newData[dataPayload].title = action.payload.title;
        newData[dataPayload].description = action.payload.description;
        newData[dataPayload].status = action.payload.status;
      }

      return {
        ...state,
        data: newData,
      };

    case 'delete_todo':
      const newData1 = state.data.filter(item => item.id !== action.payload);

      return {
        ...state,
        data: newData1,
      };
    default:
      throw new Error();
  }
}

export { initialState, reducer };
