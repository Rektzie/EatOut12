// export const Login = (userdata) => {
//     console.log(userdata)

//     return(dispatch, getState, {getFirebase, getFirestore}) => {
//         const firebase = getFirebase()
//         const firestore = getFirestore()
        
//         firebase.auth().signInWithEmailAndPassword(
//             userdata.email,
//             userdata.password
//         ).then((res) => {
//             const userId = res.user.uid
//             dispatch({type: "LOGIN_SUCCESS", data: userId})
//         }).catch((err)=> {
//             dispatch({type: "LOGIN_ERROR" ,data: err})
//         })
//     }

// }

// export const Edit