import * as React from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";

// Initialize Firebase JS SDK
// https://firebase.google.com/docs/web/setup
try {
  firebase.initializeApp({
    apiKey: 'AIzaSyApGoaZVtoVTYnftHSbT9l7nDmDVUYJYpU',
      authDomain: 'playground-d4e7b.firebaseapp.com',
      databaseURL: 'https://playground-d4e7b.firebaseio.com',
      projectId: 'playground-d4e7b',
      storageBucket: 'playground-d4e7b.appspot.com',
      messagingSenderId: '903405300293',
      appId: '1:903405300293:web:c55227a2b8064da05d112c',
  });
} catch (err) {
  // ignore app already initialized error in snack
}

export default function VerifyPhone() {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: "Verification code has been sent to your phone.",
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            showMessage({ text: "Phone authentication successful 👍" });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
          onPress={() => showMessage(undefined)}>
          <Text style={{color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
}










// import OTPInputView from '@twotalltotems/react-native-otp-input';
// import React, { useRef, useState } from 'react';
// import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
// import CodeInput from 'react-native-confirmation-code-input';

// import {
//     CodeField,
//     Cursor,
//     useBlurOnFulfill,
//     useClearByFocusCell,
// } from 'react-native-confirmation-code-field';

// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import firebase from '../firebase';

// function VerifyPhone({route, navigation}) {

//     // const [verifyCode, setVerifyCode] = useState("")
//     // const reference = useRef("codeInputRef2")
//     const recaptchaVerifier = useRef(null);
//     const {name, phone, password} = route.params;
//     const CELL_COUNT = 5;
//     const [value, setValue] = useState('');
//     const [verificationId, setVerificationId] = useState(null);
//     const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
//     const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//       value,
//       setValue,
//     });


//     const sendVerification = () => {
//         const phoneProvider = new firebase.auth.PhoneAuthProvider();
//         phoneProvider
//           .verifyPhoneNumber(phone, recaptchaVerifier.current)
//           .then(setVerificationId)
//       };
      
//       // Function to be called when confirming the verification code that we received
//       // from Firebase via SMS
//       const confirmCode = () => {
//         const credential = firebase.auth.PhoneAuthProvider.credential(
//           verificationId,
//           value
//         );
//         firebase
//           .auth()
//           .signInWithCredential(credential)
//           .then((result) => {
//             // Do something with the results here
//             console.log(result);
//           });
//       }
    



//     return (
//    <View style={styles.container}>
//        <FirebaseRecaptchaVerifierModal
//       ref={recaptchaVerifier}
//       firebaseConfig={firebase.app().options}
//     />
//        <View style={styles.header}>
//            <Text style={styles.title}>Verification du Numero</Text>
//            <Text style={styles.subTitle}>Nous vous avons envoye un code par sms</Text>
//        </View>
//        <View style={styles.codeVeri}>
//            <Text style={styles.codeVeriTxt}>Enter your code</Text>
//            {/* <OTPInputView pinCount={4} style={styles.otpInputView} onCodeFilled = {code => console.log(code)}/> */}
           
//            {/* <CodeInput 
//                ref={reference} 
//                compareWithCode='AsDW2'
//                className={'border-b'}
//                activeColor="#000" 
//                inactiveColor="#000" 
//                autoFocus={false}
//                space={5} 
//                size={60} 
//                inputPosition="center"
//                containerStyle={{ marginTop: 30 }}
//                codeInputStyle={{ borderWidth: 1.5 }} 
//                onFulfill={code => {console.log(code)}}
//                cellBorderWidth={2.0}
//             /> */}

// <CodeField
//         ref={ref}
//         {...props}
//         // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
//         value={value}
//         onChangeText={setValue}
//         cellCount={CELL_COUNT}
//         rootStyle={styles.codeFieldRoot}
//         keyboardType="number-pad"
//         textContentType="oneTimeCode"
//         renderCell={({index, symbol, isFocused}) => (
//           <Text
//             key={index}
//             style={[styles.cell, isFocused && styles.focusCell]}
//             onLayout={getCellOnLayoutHandler(index)}>
//             {symbol || (isFocused ? <Cursor /> : null)}
//           </Text>
//         )}
//       />
           
//            <TouchableOpacity
//                 activeOpacity={0.6} 
//                 style={styles.verifyButtView}
//                 onPress={() => {
//                     sendVerification
//                     navigation.navigate('Login')
//                 }}
//             >
//                 <Text style={styles.verifyButtText}>Verify</Text>
//             </TouchableOpacity>

//             <TextInput
//       placeholder="Confirmation Code"
//       onChangeText={setValue}
//       keyboardType="number-pad"
//     />
//             <TouchableOpacity onPress={confirmCode}>
//                <Text>Send Verification</Text>
//             </TouchableOpacity>

// {/* <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebase.app().options}/> */}
//        </View>
//    </View>
//  );
// }

// const styles = StyleSheet.create({
// codeVeri: {
//     alignItems: "center",
//     marginTop: 50,
// },
// codeVeriTxt: {
//     fontSize: 15,
//     // marginBottom: 2,
// },
// container: {
//     marginHorizontal: '5%',
// },
// header: {
//     marginTop: '20%',
//     // marginHorizontal: '5%',
// },
// title: {
//     fontSize: 35,
//     marginRight: "10%",
//     fontWeight: "600",
// },
// subTitle: {
//     fontSize: 15,
//     color: "#adb5bd",
//     marginRight: "10%",
//     marginTop: 5,
// },
// otpInputView: {
//     width: "80%",
//     height: 200,
// },
// verifyButtView: {
//     marginTop: "15%",
//     width: '100%',
//     height: 60,
//     backgroundColor: "#C37B89",
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
// },
// verifyButtText: {
//     color: "#fff",
//     fontSize: 25,
//     fontWeight: "500"
// },

// // root: {flex: 1, padding: 20},
// codeFieldRoot: {marginTop: 20},
// cell: {
//     width: 60,
//     height: 60,
//     lineHeight: 38,
//     fontSize: 24,
//     borderWidth: 2,
//     borderColor: '#00000030',
//     textAlign: 'center',
//   },
//   focusCell: {
//     borderColor: '#000',
//   },
// })

// export default VerifyPhone;


