# CameraApplication

This is an example integeration of package ***react-native-vision-camera***

## Issue

When using cli based project, the application fails to build the reason of that is different versions of ***kotlin-gradle-plugin***
To solve navigate to file ***build.gradle*** of the ***react-native-vision-camera*** package, which is typically located at ***node_modules/react-native-vision-camera/android*** directory of your project
Find the line where the kotlin-gradle-plugin is declared. It should look something like this:
```
classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version
```


Replace ***$kotlin_version*** with the required version, which is 1.6.20 or higher, like so:
```
classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.6.20
```


Keep in mind that modifying files in the node_modules directory can lead to issues when updating or reinstalling packages. If you encounter any problems, you might need to delete the node_modules folder and run npm install or yarn to reinstall your dependencies.
