import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AppRegistry,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';

import { MaterialIcons } from "@expo/vector-icons";
import ImageElement from '../CompanyPortfolio/ImageElement';

export default class PortfolioGallery extends React.Component {
    state = {
        imageModal: require('../../assets/img/img1.png'),
        visibleModal: false,
        images: [
            require('../../assets/img/img1.png'),
            require('../../assets/img/img2.png'),
            require('../../assets/img/img3.png'),
            require('../../assets/img/img4.png'),
            require('../../assets/img/img5.png'),
            require('../../assets/img/img6.png')
        ]
    }

    setModalVisible(visible, imgKey) {
        this.setState({ imageModal: this.state.images[imgKey] });
        this.setState({ visibleModal: visible })
    }

    getImage() {
        return this.state.imageModal;
    }

    render() {

        let images = this.state.images.map((value, key) => {
            return <TouchableWithoutFeedback key={key}
                onPress={() => this.setModalVisible(true, key)}>
                <View style={styles.imgWrapper}>
                    <ImageElement imgsource={value}></ImageElement>
                </View>
            </TouchableWithoutFeedback>
        });

        return (
            <View style={styles.container}>
                <Modal
                    style={styles.modal}
                    animationType={"fade"}
                    visible={this.state.visibleModal}
                    transparent={true}
                    onRequestClose={() => { }}
                >
                    <View style={styles.modal}>
                        <TouchableOpacity
                            onPress={() => { this.setModalVisible(false) }}
                        >
                            <MaterialIcons name="close" size={30} color='black' />
                        </TouchableOpacity>
                        <ImageElement
                            imgsource={this.state.imageModal}
                        ></ImageElement>
                    </View>
                </Modal>
                {images}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    imgWrapper: {
        margin: 2,
        padding: 1,
        width: (Dimensions.get('window').width / 3) - 4,
        height: (Dimensions.get('window').height / 5) - 12,
        backgroundColor: 'white'
    },
    modal: {
        flex: 1,
        paddingTop: 30,
        padding: 20,
        backgroundColor: 'pink'
    }
})

AppRegistry.registerComponent('Gallery', () => Gallery);