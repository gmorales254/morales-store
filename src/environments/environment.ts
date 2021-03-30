// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBjCkL54MLXXo0pXbxJPvKYqeHpOMNEzek',
    authDomain: 'espaciopequesangular.firebaseapp.com',
    databaseURL: 'https://espaciopequesangular-default-rtdb.firebaseio.com',
    projectId: 'espaciopequesangular',
    storageBucket: 'espaciopequesangular.appspot.com',
    messagingSenderId: '611883706485',
    appId: '1:611883706485:web:33ef87440d9f85efd2b03c',
    measurementId: 'G-CN7SET3KJT'
  }
};

export const API_KEY:string ='AIzaSyBjCkL54MLXXo0pXbxJPvKYqeHpOMNEzek';
export const URL_LOGIN:string =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
export const URL_REGISTRATION:string=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
