import './App.css';
import Authentification from './Pages/Auth/Auth';
import { Auth,Storage } from './Config/Firebase';
import { ref,listAll,getDownloadURL } from "firebase/storage";
import Expencetracker from './Pages/Expense-traker/ExpenceTracker';
import { HashRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

export const Context =createContext(); 

function App() {
  const [ImageList,setImageList] = useState([]);
  const [ImageRef,setImageRef]= useState(false);
  function getImages (){
    
    const imageRef = ref (Storage,`ProfilePics/${Auth?.currentUser?.uid }`)

    listAll(imageRef).then((response)=>{
      const promises = response.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImageList(urls);
        })
      })
  }
  const [userUid, setUserUid] = useState(null);
  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(user => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return (
    <>
    <h1 className='warning'> This project is not yet supported on small devices, the version for small devices is coming soon </h1>
    <Context.Provider value = {{getImages , ImageList}}>
    <Router>
      <Routes>
      {userUid ? (
        <>
        <Route path='/expence_tracker' element = {<Expencetracker/>}/>
        <Route path='*' element = {<Navigate to = "/expence_tracker"/>}/>
        </>
      ):(
        <>
        <Route path='/Home' element = {<Authentification/>}/>
        <Route path='*' element = {<Navigate to = "/home"/>}/>
        </>
      )}
        
      </Routes>
    </Router>
    </Context.Provider>
    
   
    </>
  );
}

export default App;
