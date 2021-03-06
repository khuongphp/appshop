import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    BackHandler,
    TextInput,
    Button,
    Alert,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            txt: '',
            user: {}
        }
    }
    static navigationOptions = ({ navigation }) => ({ title: 'USER' })

    onClickLogOut = () => {
        Alert.alert(
            'LOG OUT',
            'You Want To Log Out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        AsyncStorage.removeItem('token');
                        this.props.navigation.navigate('Login');
                    }
                }
            ]

        )
    }
    componentDidMount() {
        AsyncStorage.getItem('user').then(res => {
            console.log('sadad');
            const { user } = JSON.parse(res);
            console.log(user);
            this.setState({ user });
        })
    }
    render() {
        const { name, email, address, phone, avatar } = this.props.infoUser.length > 0 ? this.props.infoUser : this.state.user;
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.accountUser]} >
                    <Image
                        source={{ uri: 'https://videohive.img.customer.envatousercontent.com/files/cb7508c9-cb21-4131-9cfc-369412411804/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=dfb01d793ada1c3be4a485070113d8c8' }}
                        style={{
                            width: '100%',
                            height: 150,
                            zIndex: 1,
                        }}
                    ></Image>
                    <View style={[styles.accountInfo]}>
                        <Image
                            source={{ uri: avatar }}
                            style={{ width: 128, height: 128, borderRadius: 100, alignSelf: 'center' }}
                        ></Image>
                        <Text style={[styles.accountUserName]}>{name}</Text>
                    </View>
                </View>
                <View style={styles.accountAddress}>
                    <Text
                        onPress={
                            () => {
                                this.setState({
                                    isModal: !this.state.isModal,
                                    txt: value
                                })
                            }
                        }
                    >Address: {address}</Text>
                    <Text>Phone Number: {phone}</Text>
                    <Text>Email: {email}</Text>
                </View>
                <View style={styles.wrapBtn}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.txt}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={
                            this.onClickLogOut
                        }
                    >
                        <Text style={styles.txt}>Log Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={
                            () => {
                                BackHandler.exitApp();
                            }
                        }
                    >
                        <Text style={styles.txt}>Exit App</Text>
                    </TouchableOpacity>
                </View>


                <ModalView isModal={this.state.isModal} txt={this.state.txt}></ModalView>

            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        infoUser: state.LoginReducer.user
    }
}

export default connect(mapStateToProps, null)(User);
const ModalView = (props) => {
    const [txt, setTxt] = useState(props.txt || '');
    const [isModal, setIsModal] = useState(props.isModal || false);
    return (
        <View>
            <Modal
                isVisible={isModal}
            >
                <View
                    style={{
                        width: 200,
                        height: 100,

                    }}
                >
                    <TextInput
                        placeholder={'Enter Key'}
                        value={txt}
                        onChangeText={
                            (text) => {
                                setTxt(text)
                            }
                        }
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}
                    />
                    <Button
                        title={'Save'}
                        onPress={
                            () => {
                                setIsModal(!isModal);
                            }
                        }
                    />
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    accountUser: {
        width: '100%',
        flex: 0.4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    accountUserName: {
        fontSize: 23,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    accountInfo: {
        position: 'absolute',
        zIndex: 2,
        top: 90

    },
    accountAddress: {
        flex: 0.3,
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        paddingTop: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#CCC',
        marginHorizontal: 5,
    },
    txt: {
        color: '#1E96DD',
        alignSelf: 'center'
    },
    btn: {
        height: 30,
        width: '95%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#EED',
        backgroundColor: '#DDD',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 3
    },
    wrapBtn: {
        marginTop: 5,
        borderBottomColor: '#EEE',
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 0.3,
        justifyContent: 'flex-end',
        borderColor: '#DDD',
        marginHorizontal: 5
    }
})