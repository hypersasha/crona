import React, {Component} from 'react';

import {
    SafeAreaView, ScrollView, StyleSheet, Text,
} from 'react-native';
import Title from '../components/Title/Title';


class About extends Component {

    static navigationOptions = ({screenProps}) => {
        return {
            title: 'О приложении',
        };
    };

    render() {
        return (
            <SafeAreaView>
                <ScrollView
                    style={styles.scrollView}
                    contentInsetAdjustmentBehavior="automatic">
                    <Title>Что такое Crona?</Title>
                    <Text maxFontSizeMultiplier={1} style={styles.commonText}>Приложение Crona поможет Вам быстро и
                        просто составить бизнес-план Вашего будущего предприятия. </Text>
                    <Title>Как использовать Crona?</Title>
                    <Text maxFontSizeMultiplier={1} style={styles.commonText}>
                        Заполните все поля на главном экране, затем нажмите кнопку "Рассчитать Бизнес-план". Вы будете перенаправлены
                        на экран результатов. Ниже приведена более подробная информация о каждой единице, что нужно ввести на входном
                        экране.
                    </Text>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    commonText: {
        fontSize: 16,
        color: '#000000',
        paddingTop: 0,
        marginTop: 0,
        paddingLeft: 16,
        paddingRight: 16,
    },
});

export default About;
