import { useContext, useEffect} from "react";
import { format } from 'date-fns';
import {signOut} from "firebase/auth"
import { deleteDoc,doc } from "firebase/firestore";
import { Auth,database } from "../../Config/Firebase";
import { Context } from "../../App";



export default function ProfileSide ({dataList,getDataList,type,dataInfosList}){

    

  const {ImageList,getImages}= useContext(Context);


    
   async function logOut (){
        try {
            await signOut (Auth)
            localStorage.removeItem("GoogleName")
            localStorage.removeItem("GoogleProfilePic")
        }catch(err){
            alert("There is an issue with your loging out. Please try again")
        }
    }

   async function deleteFile(id){
    const docRef =doc(database,`users/${Auth?.currentUser?.uid}/Data`,id)
    try{
        await deleteDoc(docRef)
        getDataList();
    }catch(err){
        alert("File could not be deleted. Please try again.")
    }
   }
    useEffect(()=>{
        getDataList();
        getImages();
    },[])
    const formatTimestamp = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            return format(timestamp.toDate(), 'yyyy-MM-dd HH:mm:ss'); // Adjust the format as needed
        }
        return '';
    };
    const sortedDataList = dataList.sort((a, b) => {
        const timeA = a.time.toDate().getTime();
        const timeB = b.time.toDate().getTime();
        return timeB - timeA; // Newest first
    });
    

    return(
        <div className="side2">
            <div className="profile">

                <div className="profileInfos">
                {
  Auth?.currentUser?.uid ? (
    ImageList.length > 0 ? (
      ImageList.map((url, index) => (
        <img key={index} id="meee" src={url} alt={`Profile ${index}`} />
      ))
    ) : (
      localStorage.getItem("GoogleProfilePic") ? (
        <img src={localStorage.getItem("GoogleProfilePic")} alt="Google Profile" />
      ) : (
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Default Profile" />
      )
    )
  ) : null
}

                    {localStorage.getItem("GoogleName") ? <h1>{localStorage.getItem("GoogleName")}</h1> : dataInfosList.map((item)=> (<h1>{item.UserName}</h1>))}
                     
                </div>
                
                <button onClick={logOut}>Log out</button>
            </div>
            <div className="Transistions">
                <h3>Transistions :</h3>
                <div>
                   {sortedDataList.map((item)=>(
                        <ul id="uniqueTransistion" key={item.id}  style={item.Type === "Expense"?{color :'red'}:null}>
                            <li>{item.name} :{item.Type === "Expense"?<> -</>:null} </li>
                            <li>{item.Price} $</li>
                            <li id="date">{formatTimestamp(item.time)}</li>
                            <i class="fa-solid fa-delete-left" onClick={()=>deleteFile(item.id)}></i>
                            </ul>
                   ))}
                </div>
            </div>
            {}
        </div>
    )
}