import { promise } from 'app/actions/actionTypes';

const isPromiseAction = (actionType) => {
  let flag;

  Object.keys(promise).forEach((type) => {
    if (promise[type] === actionType) {
      flag = true;
    }
  });

  return flag;
};

export const catchReduxPromiseMiddlewareErrors = () => {
  return next => action => {
    const { payload, type } = action;

    // Only handle errors here if payload is a promise
    if (payload !== null && typeof payload === 'object' && typeof payload.then === 'function') {
      // Only handle errors from rejected promises
      if (isPromiseAction(type)) {
        return next(action).catch(error => {
          // Log warning in development only
          if (process.env.NODE_ENV === 'development') {
            console.error(error.message);
            console.warn(`Error from ${action.type} will be handled by the appropriate service`)
            console.info('Unhandled promise rejections are a side effect of redux-promise-middleware')
          }
        });
      }
    }

    return next(action);
  };
}