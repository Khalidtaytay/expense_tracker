import '../../App.css'
import ProfileSide from './ProfileSide';
import TransistionSide from './TransistionSide';
import { database,Auth } from '../../Config/Firebase';
import { getDocs,addDoc, collection,serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Expencetracker (){

    const[Detail,setDetail]=useState(null)
    const[value,setValue]=useState(null)
    const[type,setType]=useState(null)
    const[dataList,setDataList]=useState([]);
    const[dataInfosList,setdataInfosList]=useState([]);

    
    const UserUid = Auth?.currentUser?.uid
    const FireBaseData = collection(database,`users/${UserUid}/Data`);
    const InfosData = collection(database,`users/${UserUid}/informations`);
    
    useEffect(() => {
        if (UserUid) {
          getDataList();
        }
      }, [UserUid]);

     async function addDataToFirebBase (){
        if (!UserUid) {
            alert("You are not authenticated. Please log in.");
            return;
          }
          
        try{
            if(!value||!Detail||type == null){
                alert("Please provide the details and specify whether it is an expense or income, and ensure that all values are valid")
                return null
              }else{
            await addDoc(FireBaseData,{
                name : Detail,
                Price : value,
                Type :type,
                time:serverTimestamp()})
            getDataList();
              }

        }catch(err){
            alert("Failed to add your data. Please try again.")
        }
     }


     async function getDataList (){
        if (!UserUid) {
            alert("You are not authenticated. Please log in.");
            return;
          }
        try{
            const data = await getDocs(FireBaseData);
            const dataInfos = await getDocs(InfosData);
            const dataFiltred = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            const dataInfosFiltred = dataInfos.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setDataList(dataFiltred);
            setdataInfosList(dataInfosFiltred);
        }catch(err){
            alert ("Unable to read your data. Please try again.")
        }
    }

    return(
        <div className="Expencetracker">
          <div className='SVGS'>
              <div className="SVGSloging">
                   <svg width="50" height="45"viewBox="0 0 94 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                        
                        <path id='Svgs-lign' d="M3 102.724C5.39142 56.4405 11.5525 -26.208 17.0654 13.4633C23.9564 63.0524 24.4284 176.556 30.7531 102.724C35.8129 43.6576 44.8185 46.5228 48.6888 55.3386H94" stroke="#229620" stroke-width="5"/>
                   </svg>
              </div>

              <svg  width="150" height="20" viewBox="0 0 481 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path id='Svgs-text' d="M26.623 28.3965H14.4941V39.793H25.2461L26.623 34.8711H32.0137V47H0.695312V41.9023L5.20703 40.0859V11.9023L0.695312 10.0859V4.98828L14.4941 4.69531H31.3105V16.2676H25.8906L24.3965 11.9023H14.4941V21.8047H26.623V28.3965ZM65.6172 20.4863L58.7324 30.7988L65.5 40.9941L69.9531 42.1953V47H53.6348V42.1953L55.4805 41.5508L52.3164 36.248L45.8125 47H35.6172V42.1953L40.1289 40.9941L46.7207 31.0918L39.4551 20.4863L36.2324 19.6953V14.8906L51.7598 14.5977V19.6953L49.9727 20.0469L53.0781 25.3496L59.3184 14.8906L69.3379 14.5977V19.6953L65.6172 20.4863ZM84.2207 14.5977L84.7773 17.9668C84.7773 17.8887 85.2461 17.498 86.1836 16.7949C87.1211 16.0918 88.2344 15.457 89.5234 14.8906C90.832 14.3047 92.209 14.0117 93.6543 14.0117C97.7363 14.0117 100.832 15.418 102.941 18.2305C105.07 21.043 106.135 24.9297 106.135 29.8906C106.135 35.5352 104.787 39.9004 102.092 42.9863C99.416 46.0527 95.5 47.5859 90.3438 47.5859C88.6641 47.5859 86.9648 47.3906 85.2461 47V54.6172L90.959 55.9941V60.7988H71.5645V55.9941L76.252 54.6172V21.1895L71.4473 19.6953V14.8906L84.2207 14.5977ZM85.2461 39.793C86.6133 40.3984 88.1758 40.7012 89.9336 40.7012C92.4141 40.7012 94.1816 39.8809 95.2363 38.2402C96.291 36.5996 96.8184 34.1777 96.8184 30.9746C96.8184 27.8105 96.3496 25.3887 95.4121 23.709C94.4746 22.0293 92.9414 21.1895 90.8125 21.1895C89.6602 21.1895 88.6738 21.4336 87.8535 21.9219C87.0332 22.4102 86.3887 22.9473 85.9199 23.5332C85.4707 24.0996 85.2461 24.4219 85.2461 24.5V39.793ZM119.963 32.791C120.119 35.1934 120.842 37.0684 122.131 38.416C123.439 39.7441 125.139 40.4082 127.229 40.4082C128.713 40.4082 130.197 40.2031 131.682 39.793C133.186 39.3633 134.426 38.9336 135.402 38.5039C136.398 38.0547 137.033 37.7422 137.307 37.5664L139.885 42.5469C139.885 42.625 139.182 43.123 137.775 44.041C136.389 44.9395 134.68 45.7598 132.648 46.502C130.637 47.2246 128.488 47.5859 126.203 47.5859C121.125 47.5859 117.258 46.1797 114.602 43.3672C111.945 40.5547 110.617 36.5703 110.617 31.4141C110.617 27.9375 111.252 24.8906 112.521 22.2734C113.811 19.6367 115.656 17.6055 118.059 16.1797C120.461 14.7344 123.312 14.0117 126.613 14.0117C131.008 14.0117 134.377 15.2715 136.721 17.791C139.064 20.3105 140.236 23.748 140.236 28.1035C140.236 29.0605 140.188 29.9883 140.09 30.8867C139.992 31.7852 139.924 32.3516 139.885 32.5859L119.963 32.791ZM126.027 21.1895C124.387 21.1895 123.049 21.7461 122.014 22.8594C120.979 23.9531 120.334 25.3984 120.08 27.1953H130.949C130.949 25.3984 130.549 23.9531 129.748 22.8594C128.947 21.7461 127.707 21.1895 126.027 21.1895ZM157.609 18.7285C157.609 18.6504 158.234 18.2012 159.484 17.3809C160.754 16.5605 162.199 15.8184 163.82 15.1543C165.441 14.4707 167.053 14.1289 168.654 14.1289C171.525 14.1289 173.762 15.0762 175.363 16.9707C176.965 18.8652 177.766 21.4727 177.766 24.793V40.7012L181.984 42.1953V47H165.461V42.1953L168.771 40.7012V26.4336C168.771 25.0273 168.4 23.875 167.658 22.9766C166.916 22.0781 165.93 21.6289 164.699 21.6289C163.586 21.6289 162.551 21.8828 161.594 22.3906C160.656 22.8789 159.865 23.4258 159.221 24.0312C158.596 24.6172 158.283 24.9492 158.283 25.0273V40.7012L161.564 42.1953V47H144.484V42.1953L149.289 40.7012V21.1895L144.484 19.6953V14.8906L157.199 14.5977L157.609 18.7285ZM191.623 40.4082C191.623 40.4473 192.15 40.5547 193.205 40.7305C194.26 40.9062 195.412 40.9941 196.662 40.9941C199.943 40.9941 201.574 40.0176 201.555 38.0645C201.555 37.1855 201.096 36.4727 200.178 35.9258C199.26 35.3789 197.805 34.7734 195.812 34.1094C193.684 33.3867 191.936 32.6836 190.568 32C189.221 31.3164 188.049 30.3496 187.053 29.0996C186.057 27.8301 185.559 26.2188 185.559 24.2656C185.559 20.75 186.73 18.1621 189.074 16.502C191.438 14.8418 194.387 14.0117 197.922 14.0117C199.523 14.0117 201.145 14.1387 202.785 14.3926C204.445 14.6465 205.832 14.9297 206.945 15.2422C208.078 15.5352 208.781 15.7207 209.055 15.7988L208.82 24.793H203.723L202.844 21.1895C202.844 21.1504 202.395 21.043 201.496 20.8672C200.617 20.6914 199.68 20.6035 198.684 20.6035C197.355 20.6035 196.33 20.8672 195.607 21.3945C194.904 21.9023 194.553 22.6543 194.553 23.6504C194.553 24.5293 195.012 25.2324 195.93 25.7598C196.848 26.2871 198.303 26.8438 200.295 27.4297C202.424 28.1133 204.172 28.7676 205.539 29.3926C206.926 30.0176 208.107 30.9355 209.084 32.1465C210.08 33.3379 210.578 34.8906 210.578 36.8047C210.578 40.2031 209.328 42.8496 206.828 44.7441C204.328 46.6387 200.979 47.5859 196.779 47.5859C195.1 47.5859 193.439 47.4883 191.799 47.293C190.158 47.0977 188.801 46.9023 187.727 46.707C186.672 46.5117 186.008 46.3652 185.734 46.2676V36.5117H191.125L191.623 40.4082ZM224.143 32.791C224.299 35.1934 225.021 37.0684 226.311 38.416C227.619 39.7441 229.318 40.4082 231.408 40.4082C232.893 40.4082 234.377 40.2031 235.861 39.793C237.365 39.3633 238.605 38.9336 239.582 38.5039C240.578 38.0547 241.213 37.7422 241.486 37.5664L244.064 42.5469C244.064 42.625 243.361 43.123 241.955 44.041C240.568 44.9395 238.859 45.7598 236.828 46.502C234.816 47.2246 232.668 47.5859 230.383 47.5859C225.305 47.5859 221.438 46.1797 218.781 43.3672C216.125 40.5547 214.797 36.5703 214.797 31.4141C214.797 27.9375 215.432 24.8906 216.701 22.2734C217.99 19.6367 219.836 17.6055 222.238 16.1797C224.641 14.7344 227.492 14.0117 230.793 14.0117C235.188 14.0117 238.557 15.2715 240.9 17.791C243.244 20.3105 244.416 23.748 244.416 28.1035C244.416 29.0605 244.367 29.9883 244.27 30.8867C244.172 31.7852 244.104 32.3516 244.064 32.5859L224.143 32.791ZM230.207 21.1895C228.566 21.1895 227.229 21.7461 226.193 22.8594C225.158 23.9531 224.514 25.3984 224.26 27.1953H235.129C235.129 25.3984 234.729 23.9531 233.928 22.8594C233.127 21.7461 231.887 21.1895 230.207 21.1895ZM259.885 11.9023H254.172L252.678 17.5859H247.141V4.69531H281.945V17.5859H276.379L274.885 11.9023H269.172V40.0859L274.885 41.9023V47H254.172V41.9023L259.885 40.0859V11.9023ZM297.766 18.7285C297.766 18.6504 298.234 18.1914 299.172 17.3516C300.109 16.5117 301.193 15.75 302.424 15.0664C303.674 14.3633 304.904 14.0117 306.115 14.0117C307.072 14.0117 307.971 14.0898 308.811 14.2461C309.65 14.4023 310.305 14.5684 310.773 14.7441C311.262 14.9199 311.564 15.0273 311.682 15.0664L311.213 26.6094H305.822L304.914 21.5117C303.879 21.5117 302.873 21.7656 301.896 22.2734C300.939 22.7617 300.119 23.3086 299.436 23.9141C298.771 24.5 298.439 24.8125 298.439 24.8516V40.7012L304.445 42.1953V47H284.641V42.1953L289.445 40.7012V21.1895L284.641 19.6953V14.8906L297.238 14.5977L297.766 18.7285ZM333.479 43.1035C333.479 43.1816 332.961 43.6211 331.926 44.4219C330.891 45.2227 329.65 45.9551 328.205 46.6191C326.76 47.2637 325.275 47.5859 323.752 47.5859C320.822 47.5859 318.527 46.7754 316.867 45.1543C315.227 43.5137 314.406 41.1895 314.406 38.1816C314.406 34.7441 315.637 32.2344 318.098 30.6523C320.559 29.0703 324.143 28.2793 328.85 28.2793H333.068V24.9688C333.068 22.0391 331.525 20.584 328.439 20.6035C327.521 20.6035 326.672 20.6719 325.891 20.8086C325.109 20.9453 324.484 21.0918 324.016 21.248C323.566 21.3848 323.283 21.4727 323.166 21.5117L322.258 25.291H316.867L316.457 16.4141C316.809 16.2969 317.668 16.043 319.035 15.6523C320.422 15.2617 322.072 14.8906 323.986 14.5391C325.92 14.1875 327.746 14.0117 329.465 14.0117C332.551 14.0117 335.002 14.4023 336.818 15.1836C338.635 15.9453 339.963 17.1953 340.803 18.9336C341.643 20.6523 342.062 22.9668 342.062 25.877V40.7012L346.574 41.7852V46.5898L334.562 47L333.479 43.1035ZM323.107 37.2734C323.107 38.4453 323.41 39.3438 324.016 39.9688C324.641 40.5742 325.52 40.877 326.652 40.877C327.609 40.877 328.557 40.623 329.494 40.1152C330.432 39.5879 331.223 39.0508 331.867 38.5039C332.512 37.9375 332.912 37.5664 333.068 37.3906V33.377H329.641C327.316 33.377 325.646 33.6895 324.631 34.3145C323.615 34.9395 323.107 35.9258 323.107 37.2734ZM378.625 42.4883C377.277 43.6992 375.51 44.8516 373.322 45.9453C371.154 47.0391 368.625 47.5859 365.734 47.5859C360.812 47.5859 356.984 46.1504 354.25 43.2793C351.516 40.4082 350.148 36.4043 350.148 31.2676C350.148 25.916 351.594 21.707 354.484 18.6406C357.395 15.5547 361.447 14.0117 366.643 14.0117C368.166 14.0117 369.699 14.168 371.242 14.4805C372.805 14.793 374.104 15.1152 375.139 15.4473C376.193 15.7598 376.857 15.9746 377.131 16.0918L376.838 25.9355H371.447L370.598 21.6875C370.402 21.6484 369.914 21.5605 369.133 21.4238C368.352 21.2676 367.463 21.1895 366.467 21.1895C364.26 21.1895 362.531 21.9414 361.281 23.4453C360.051 24.9492 359.436 27.1562 359.436 30.0664C359.436 33.3867 360.061 35.9453 361.311 37.7422C362.58 39.5195 364.455 40.4082 366.936 40.4082C368.498 40.4082 369.865 40.1738 371.037 39.7051C372.229 39.2168 373.225 38.7188 374.025 38.2109C374.826 37.7031 375.363 37.3711 375.637 37.2148L378.625 42.4883ZM398.518 26.668L402.59 20.5449L399.953 19.6953V14.8906L415.451 14.5977V19.6953L411.232 20.4863L405.666 28.3379L412.375 40.7598L416.945 42.1953V47H405.842L398.4 32.3516H394.562V40.7012L397.873 42.1953V47H380.764V42.1953L385.568 40.7012V6.98047L380.764 5.7793V0.974609L394.562 0.505859V26.668H398.518ZM428.986 32.791C429.143 35.1934 429.865 37.0684 431.154 38.416C432.463 39.7441 434.162 40.4082 436.252 40.4082C437.736 40.4082 439.221 40.2031 440.705 39.793C442.209 39.3633 443.449 38.9336 444.426 38.5039C445.422 38.0547 446.057 37.7422 446.33 37.5664L448.908 42.5469C448.908 42.625 448.205 43.123 446.799 44.041C445.412 44.9395 443.703 45.7598 441.672 46.502C439.66 47.2246 437.512 47.5859 435.227 47.5859C430.148 47.5859 426.281 46.1797 423.625 43.3672C420.969 40.5547 419.641 36.5703 419.641 31.4141C419.641 27.9375 420.275 24.8906 421.545 22.2734C422.834 19.6367 424.68 17.6055 427.082 16.1797C429.484 14.7344 432.336 14.0117 435.637 14.0117C440.031 14.0117 443.4 15.2715 445.744 17.791C448.088 20.3105 449.26 23.748 449.26 28.1035C449.26 29.0605 449.211 29.9883 449.113 30.8867C449.016 31.7852 448.947 32.3516 448.908 32.5859L428.986 32.791ZM435.051 21.1895C433.41 21.1895 432.072 21.7461 431.037 22.8594C430.002 23.9531 429.357 25.3984 429.104 27.1953H439.973C439.973 25.3984 439.572 23.9531 438.771 22.8594C437.971 21.7461 436.73 21.1895 435.051 21.1895ZM466.633 18.7285C466.633 18.6504 467.102 18.1914 468.039 17.3516C468.977 16.5117 470.061 15.75 471.291 15.0664C472.541 14.3633 473.771 14.0117 474.982 14.0117C475.939 14.0117 476.838 14.0898 477.678 14.2461C478.518 14.4023 479.172 14.5684 479.641 14.7441C480.129 14.9199 480.432 15.0273 480.549 15.0664L480.08 26.6094H474.689L473.781 21.5117C472.746 21.5117 471.74 21.7656 470.764 22.2734C469.807 22.7617 468.986 23.3086 468.303 23.9141C467.639 24.5 467.307 24.8125 467.307 24.8516V40.7012L473.312 42.1953V47H453.508V42.1953L458.312 40.7012V21.1895L453.508 19.6953V14.8906L466.105 14.5977L466.633 18.7285Z" fill="white"/>
                 </svg>
          </div>
            <TransistionSide dataList = {dataList}  addDataToFirebBase ={addDataToFirebBase} setValue = {setValue} setDetail ={setDetail} setType = {setType} />       
            <ProfileSide dataList = {dataList} setDataList = {setDataList} getDataList = {getDataList} type ={type} dataInfosList ={dataInfosList} />
        </div>
    )
}