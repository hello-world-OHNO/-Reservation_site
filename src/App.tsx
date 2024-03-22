import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/top';
import Login from './pages/login';
import ShopDetailPage from './pages/[shop_id]/shop_detail';
import ShopRsvPage from './pages/[shop_id]/rsv';
import ChatPage from './pages/chat';
import ContactPage from './pages/contact';
import ContactCompletionPage from './pages/contactCompletion';
import Registration from './pages/registration';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/chat" component={ChatPage} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="/:shop_id/shop_detail" component={ShopDetailPage} />
          <Route path="/:shop_id/rsv" component={ShopRsvPage} />
          <Route path="/registration" component={Registration} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/contactCompletion" component={ContactCompletionPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;