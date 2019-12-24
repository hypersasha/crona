import React, {Component} from 'react';

import {View, Text, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import {StyleSheet} from 'react-native';

class Button extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {...restProps} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.6} {...restProps} >
                <View style={styles.buttonView}>
                    <Text  maxFontSizeMultiplier={1} style={styles.buttonText}>Рассчитать Бизнес-план</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonView: {
        backgroundColor: '#FF5722',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 17
    }
});

export default Button;
