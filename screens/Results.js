import React, {Component} from 'react';
import {
    View,
    SafeAreaView, ScrollView, StyleSheet, Dimensions, Text,
} from 'react-native';

import {LineChart} from 'react-native-chart-kit';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Title from '../components/Title/Title';

const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 167, 38, ${opacity})`,
    labelColor: (opacity = 0.8) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    propsForBackgroundLines: {
        strokeWidth: 2,
        stroke: '#d4d4d4',
    },
    propsForDots: {
        r: '6',
        color: '#ffa726',
    },
};
const screenWidth = Dimensions.get('window').width;

class Results extends Component {

    static navigationOptions = ({screenProps}) => {
        return {
            title: 'Результат',
        };
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={styles.contentContainer}
                    style={styles.scrollView}>
                    <Title>Ваш бизнес-план</Title>
                    <Text maxFontSizeMultiplier={1} style={styles.commonText}>
                        Основываясь на данных с предыдущего экрана Crona построила бизнес-план для Вашего проекта. Вы
                        можете вернуться на экран назад, чтобы изменить входные данные.
                    </Text>
                    <View style={{marginTop: 20}}>
                        <Title>Финансовый профиль проекта</Title>
                        <Text maxFontSizeMultiplier={1} style={styles.commonText}>
                            Значения по оси Y указаны в тысячах.
                        </Text>
                        <LineChart
                            data={{
                                labels: ['0', '1', '2', '3', '4', '5', '6'],
                                datasets: [
                                    {data: this.props.navigation.getParam('CurrentNPV', [0])},
                                    // Used for 0 line.
                                    {
                                        data: [0, 0, 0, 0, 0, 0, 0],
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    }],
                            }}
                            width={screenWidth - 34}
                            height={220}
                            formatYLabel={(val) => {
                                return Math.round(val / 1000);
                            }}
                            fromZero={true}
                            yAxisSuffix={'К'}
                            chartConfig={chartConfig}
                            style={{borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: '#e3e3e3', marginHorizontal: 16}}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Title>Динамика остатка денежных средств</Title>
                        <Text maxFontSizeMultiplier={1} style={styles.commonText}>
                            Значения по оси Y указаны в тысячах.
                        </Text>
                        <LineChart
                            data={{
                                labels: ['0', '1', '2', '3', '4', '5', '6'],
                                datasets: [
                                    {data: this.props.navigation.getParam('CashFlow', [0])},
                                    {
                                        data: [0, 0, 0, 0, 0, 0, 0],
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    },
                                ],
                            }}
                            width={screenWidth - 34}
                            height={220}
                            fromZero={true}
                            formatYLabel={(val) => {
                                return Math.round(val / 1000);
                            }}
                            yAxisSuffix={'К'}
                            chartConfig={chartConfig}
                            style={{borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: '#e3e3e3', marginHorizontal: 16}}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.white,
    },
    contentContainer: {
        paddingBottom: 20,
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

export default Results;
