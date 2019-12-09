import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

class Div extends Component {
    render() {
        const {children, ...restProps} = this.props;
        return(
            <View style={styles.div}>
                {children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    div: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
    }
});

export default Div;
