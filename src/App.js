import { useEffect, useState } from 'react';
import './App.css';
import db from "./firebase";
import { collection, getDocs, orderBy, onSnapshot, query } from "firebase/firestore"

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //データベースからデータを取得。
    const postData = collection(db, "posts");
    const q = query(postData, orderBy("timestamp", "desc"));
    getDocs(q).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
      setPosts (snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
    /* リアルタイムで取得 */
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => ({...doc.data()})))
    })
  }, []);

  return (
    <div className="App">
      <div>
        {posts.map((post) => (
          <div key={post.title}>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
