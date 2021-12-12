
import React , {Component} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react/cjs/react.development';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};


function TermsAndConditions({navigation}) {

  const [accepted, setAccepted] = useState(false)
  
  return (
     <View style={styles.container}>
            <Text style={styles.title}>Terms and conditions</Text>
            <ScrollView 
            style={styles.tcContainer}
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  setAccepted(true)
                }
              }}
            >
                <Text style={styles.tcP}>Welcome to our App. If you continue to browse and use this App, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern KAKO Market’s relationship with you in relation to this app. If you disagree with any part of these terms and conditions, please do not use our app.</Text>
                <Text style={styles.tcP}>The term KAKO MARKET refers to a platform initially based in Cameroon which allows users to buy and sell second hand stuffs..</Text>
                    <Text style={styles.tcL}>{'\u2022'} The content of the pages of this app is for your general information and use only. It is subject to change without notice.</Text>
                    <Text style={styles.tcL}>{'\u2022'} This app used your phone number, name, password, email, location, profile picture and more and store the data into our database for security purpose.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this app for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of any information or materials on this app is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</Text>
                    <Text style={styles.tcL}>{'\u2022'} This app contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</Text>
                    <Text style={styles.tcL}>{'\u2022'} All trademarks reproduced in this app, which are not the property of, or licensed to the operator, are acknowledged on the app.
Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</Text>
                    <Text style={styles.tcL}>{'\u2022'} From time to time, this app may also include links to other app. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</Text>
                    <Text style={styles.tcL}>{'\u2022'} This app will store all the files and medias that you will share into our database to enhance the user experience</Text>
                <Text style={styles.tcP}>The use of this website is subject to the following terms of use</Text>
            </ScrollView>

            <TouchableOpacity disabled={ !accepted } onPress={ ()=> navigation.navigate('Login')} style={accepted ? styles.button : styles.buttonDisabled }><Text style={styles.buttonLabel}>Accept</Text></TouchableOpacity>
      </View>
    );
}

  

    



const { width , height } = Dimensions.get('window');

const styles = {

  container:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },
  tcP: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcP:{
      marginTop: 10,
      fontSize: 12
  },
  tcL:{
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcContainer: {
      marginTop: 15,
      marginBottom: 15,
      height: height * .7
  },

  button:{
      backgroundColor: '#136AC7',
      borderRadius: 5,
      padding: 10
  },

  buttonDisabled:{
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
 },

  buttonLabel:{
      fontSize: 14,
      color: '#FFF',
      alignSelf: 'center'
  }

}

export default TermsAndConditions;
