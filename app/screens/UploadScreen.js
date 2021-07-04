import React from 'react';
import {Modal, StyleSheet, Text, View} from "react-native";
import * as Progress from 'react-native-progress'
import colors from "../config/colors";
import LottieView from "lottie-react-native";

function UploadScreen({onDone, progress = 0, visible = false}) {
    return (
        <Modal visible={visible}>
        <View style={styles.container}>
            {progress < 1 ? <Progress.Bar color={colors.primary} progress={progress} width={200} /> : <LottieView onAnimationFinish={onDone} style={styles.animation} loop={false} autoPlay source={require('../assets/animations/done.json')} />}
        </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    animation:{
        width: 150,
    },
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
})
export default UploadScreen;