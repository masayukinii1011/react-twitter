import React, { useEffect } from "react";
import styles from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Feed from "./components/Feed";
import Auth from "./components/Auth";
import { USER } from "./type";

const App: React.FC = () => {
  const user = useSelector(selectUser); //Storeからstateを参照
  const dispatch = useDispatch(); //Storeからreducerを参照。actionを引数に入れてdispatch

  useEffect(() => {
    //onAuthStateChanged。認証状態購読開始。購読解除するメソッドunSub()を返す。
    //マウント時もしくはdispatchに変更があった時、認証状態購読開始。
    //認証状態があればlogin()実行。なければlogut()実行。
    //アンマウント時に購読解除。
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const profile: USER = {
          uid: authUser.uid,
          photoUrl: authUser.photoURL,
          displayName: authUser.displayName,
        };
        dispatch(login(profile));
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
