import React, {Component} from 'react';

import {View, Text, Image, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import LOGO from './assets/icon-600.png';
import {withNavigation} from 'react-navigation';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <View style={styles.headerView}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1}}>
                <View>
                    <Image style={{width: 64, height: 64, marginLeft: 5}} source={LOGO}/>
                </View>
                <View>
                    <Text style={styles.headerText}>Crona</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('About')}} style={styles.aboutButton}>
                    <Ionicons name={'ios-help-circle'} size={32} color={'#E2E2E2'}/>
                </TouchableOpacity>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    headerView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
        backgroundColor: '#ffffff',
    },
    headerTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
    },
    headerText: {
        fontWeight: '700',
        color: '#000000',
        fontSize: 17,
    },
    aboutButton: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 16,
        width: 44,
        height: 44,
    },
});

export default withNavigation(Header);
