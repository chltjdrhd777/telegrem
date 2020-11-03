import LoginPage from "components/LoginPage";
import Telegrem from "components/Telegrem";
import { authService } from "DB/firestore";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "redux/homeReducer";

function App() {
  const dispatch = useDispatch();
  //const userCheck = useSelector((state: CombinedReducerState) => state.user);
  const userCheck = useSelector(selectUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            photo: user.photoURL,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return <div>{userCheck.userInfo ? <Telegrem /> : <LoginPage />}</div>;
}

export default App;
