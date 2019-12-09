import React, {Component} from 'react';

import {Text, StyleSheet} from 'react-native';

class Title extends Component {
    render() {
        const {children, ...restProps} = this.props;
        return(
            <Text style={styles.title} maxFontSizeMultiplier={1}>{children}</Text>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        color: '#222222',
        fontWeight: "700",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10
    }
});

export default Title;

