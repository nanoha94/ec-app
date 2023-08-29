import { FirebaseTimestamp, auth, db } from "../../firebase";
import initialState from "../store/initialState";
import { signInAction } from "./reducers";

// 認証確認
export const listenAuthState = (navigate) => {
  return async (dispatch) => {
    await auth.onAuthStateChanged((user) => {
      // 認証済み
      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          });
      }
      // 未認証
      else {
       navigate("/signin");
      }
    });
  };
};

// サインアップ
export const signUp = (
  username,
  email,
  password,
  confirmPassword,
  navigate
) => {
  return async () => {
    // Validation
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です。");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください。");
      return false;
    }

    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        // アカウント登録成功
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
          };

          // データベースに登録
          return db
            .collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              navigate("/");
            });
        }
      });
  };
};

// パスワードリセット
export const resetPassword = (email, navigate) => {
  return async(dispatch) => {
    if(email === "") {
      alert("必須項目が未入力です。");
      return false;
    }else{
      auth.sendPasswordResetEmail(email).then(() => {
        alert("入力されたアドレスにパスワードリセット用のメールを送信しました。");
        navigate('/signin');
      }).catch(() => {
        alert("パスワードリセットに失敗しました。通信状況を確認して、再度お試しください。");
      })
    }
  }
}

// サインイン
export const signIn = (email, password, navigate) => {
  return async (dispatch) => {
    // Validation
    if (email === "" || password === "") {
      alert("必須項目が未入力です。");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );

            navigate("/");
          });
      }
    });
  };
};

// サインアウト
export const signOut = (navigate) => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signInAction(initialState));
      navigate("/signin");
    });
  };
};
