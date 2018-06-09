import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import promise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import PostEdit from './components/post_edit';
import Dashboard from './components/dashboard';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, promise)(
  createStore
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/courses/new" component={PostsNew} />
          <Route path="/posts/:id/edit" component={PostEdit} />
          <Route path="/courses/:id" component={PostsShow} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.container')
);
