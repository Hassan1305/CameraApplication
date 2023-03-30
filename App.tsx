/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Camera, useCameraDevices } from 'react-native-vision-camera';

function App(): JSX.Element {
  const devices = useCameraDevices()
  const device = devices.back
  const camera = useRef<Camera>(null)

  const [showCamera, setshowCamera] = useState(true)
  const [imageSource, setimageSource] = useState('')

  useEffect(() => {
    //Writing the getPermissions function to get the permissions
    async function getPermissions() {
      const cameraPermission = await Camera.getCameraPermissionStatus()
      console.log("cameraPermission permission status: ", cameraPermission)
      if (cameraPermission === 'denied') await Linking.openSettings()
    }

    getPermissions();
  }, [])

  const takePhoto = async () => {
    if (camera?.current !== null) {
      const photo = await camera.current.takePhoto()
      setimageSource(photo.path)
      setshowCamera(false)
      console.log("Photo at path: ", photo.path)
    } else {
      console.log("Camera is null")
    }
  }


  if (device == null) {
    return (
      <Text >
        no permissions granted or no camera available
      </Text>
    )
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#fff'} />
        <View>
          {showCamera ? (
            <>
              <Camera
                ref={camera}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '90%',
                }}
                device={device}
                isActive={showCamera}
                photo={true}
              />
              <View
                style={{
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '10%',
                  width: '100%',
                }}
              >
                <TouchableOpacity
                  onPress={() => takePhoto()}
                  style={styles.camButton}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                    }}
                  >
                    Capture
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {imageSource !== '' &&
                <Image
                  style={styles.image}
                  source={{
                    uri: `file://'${imageSource}`
                  }}
                />
              }
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => setshowCamera(true)}
                  style={styles.backButton}
                >
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                    }}
                  > Retake</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </SafeAreaView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
  },
  buttonContainer: {
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: '10%',
  },
  image: {
    width: '100%',
    height: '90%',
  },
  camButton: {
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
  },
  buttons: {
  },
  backButton: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'black',
    borderWidth: 3,
  },

});

export default App;
