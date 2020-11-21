// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import * as firebase from 'firebase';

// //
// // Initial State...
// //

// const initialState = {
//     // favoriteAnimal: "duck",
//     // personData: { },
//     loginUser: 'non'
// };

// //
// // Reducer...
// //

// const reducer = (state = initialState, action) => {
//     switch(action.type) {
//         case "setLoginUser": 
//             return { ...state, loginUser: action.value };
//         default: 
//             return state;
//     }
// };

// //
// // Store...
// //

// const store = createStore(reducer, applyMiddleware(thunkMiddleware));
// export { store };

// //
// // Action Creators...
// //

// // const setFavoriteAnimal = (favoriteAnimal) => {
// //     return {
// //         type: "setFavoriteAnimal",
// //         value: favoriteAnimal,
// //     };
// // }

// // const setPersonData = (personData) => {
// //     return {
// //         type: "setPersonData",
// //         value: personData
// //     };
// // }

// const setLoginUser = (loginUser) => {
//     return {
//         type: "setLoginUser",
//         value: loginUser
//     }
// }

// // const watchPersonData = () => {
// //     return function(dispatch) {
// //         firebase.database().ref("person").on("value", function(snapshot) {
// //             var personData = snapshot.val();
// //             dispatch(setPersonData(personData));
// //         }, function(error) { });
// //     };
// // }

// export { setLoginUser
//     // setFavoriteAnimal, setPersonData
//     // , watchPersonData 
// };