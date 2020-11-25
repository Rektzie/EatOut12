import firebase from 'firebase';

class Fire{
    constructor(){
        this.init()
        this.checkAuth()
        this.db = null
    }

    set setDB(to) {
        this.db = firebase.database().ref(to)
    }

    init = () =>{
        if(!firebase.apps.length){
            firebase.initializeApp(
                {
                    apiKey: 'AIzaSyA0whqjvXQJI8p1cP6OqpoMOGtWU_RmBGM',
                    authDomain: 'eatout-27c7d.firebaseapp.com',
                    databaseURL: 'https://eatout-27c7d.firebaseio.com',
                    storageBucket: 'eatout-27c7d.appspot.com',
                    projectId: 'eatout-27c7d',
                    messagingSenderId: '358366068015',
                    appId: '1:358366068015:android:e19deae0f1549b450f75da',
                  }
            )
        }
    }
        checkAuth = () => {
            firebase.auth().onAuthStateChanged(user => {
                if(!user){
                    firebase.auth().signInAnonymously();
                }
            })
        }
        

        send = messages =>{
            messages.forEach(item => {
                const message = {
                    text: item.text,
                    timestap: firebase.database.ServerValue.TIMESTAMP,
                    user: item.user
                }

                this.db.push(message)
            })
        };
        parse = message => {
            const {user, text, timestap} = message.val();
            const {key: _id} = message;
            const createdAt = new Date(timestap);

            return{
                _id,
                createdAt,
                text,
                user
            };
        };

        get = callback =>{
            this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
        };

        off() {
            this.db.off;
        }

        get uid() {
            return  (firebase.auth().currentUser || {}).uid;
            
        }

        

}

export default new Fire();