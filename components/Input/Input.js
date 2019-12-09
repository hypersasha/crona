import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, Text} from 'react-native'

import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class Input extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFocused: false
        };
    }

    render() {
        const {title, description, units, id, onChange, ...restProps} = this.props;
        const {isFocused} = this.state;
        return (
            <View style={styles.body}>
                <View style={styles.inputInfoBox}>
                    {title && <Text maxFontSizeMultiplier={1} style={styles.inputTitle}>{title}</Text>}
                    {units && <Text maxFontSizeMultiplier={1} style={styles.inputUnits}>{units}</Text>}
                </View>
                <View>
                    <TextInput {...restProps}
                                onChange={(event) => {onChange(event, id)}}
                               onFocus={() => { this.setState({isFocused: true}) }}
                               onBlur={() => {this.setState({isFocused: false})}}
                               style={getInputStyles(isFocused)} />
                </View>
                {
                    description &&
                    <View>
                        <Text maxFontSizeMultiplier={1} style={styles.inputDescription}>
                            {description}
                        </Text>
                    </View>
                }
            </View>
        );
    }
}

function getInputStyles(isFocused) {
    if (isFocused) {
        return {...styles.input, ...styles.inputFocused};
    } else {
        return styles.input;
    }
}

const styles = StyleSheet.create({
    body: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 10
    },
    inputView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    input: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        fontSize: 16,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8
    },
    inputFocused: {
        borderColor: '#FF662C'
    },
    inputType: {
        paddingBottom: 5
    },
    inputTypeName: {
        fontSize: 21,
        fontWeight: "400",
        color: "#333333"
    },
    inputInfoBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 6
    },
    inputTitle: {
        fontSize: 17,
        color: '#000000',
    },
    inputUnits: {
        fontSize: 15,
        color: '#FF662C',
        textTransform: 'uppercase'
    },
    inputDescription: {
        color: '#575757',
        fontSize: 14,
        paddingTop: 6
    }
});

export default Input;

