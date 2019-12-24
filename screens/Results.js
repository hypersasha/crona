import React, {Component} from 'react';
import {
    View,
    SafeAreaView, ScrollView, StyleSheet, Dimensions, Text,
} from 'react-native';

// import {LineChart} from 'react-native-chart-kit';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Title from '../components/Title/Title';
import LineChart from 'react-native-responsive-linechart';
import {data} from 'react-native-chart-kit/data';

const screenWidth = Dimensions.get('window').width;

const ResultTable = (props) => {
    const data = props.data || [];
    const dataRows = data.map((item, i, arr) => {
        return <View key={Math.random() * 100000} style={{
            display: 'flex',
            flexDirection: 'row',
            borderBottomColor: '#EAEAEA',
            backgroundColor: ((i+1) % 2 === 0 ? '#FAFAFA' : '#FFFFFF'),
            borderBottomWidth: (i + 1 < arr.length ? 1 : 0),
        }}>
            <View style={{padding: 10, flexBasis: 80}}><Text>Год {i}</Text></View>
            <View style={{
                padding: 10,
                borderLeftWidth: 1,
                borderLeftColor: '#EAEAEA',
            }}><Text>{item.toFixed(2)}</Text></View>
        </View>;
    });
    return <View style={{marginHorizontal: 16, marginTop: 10, borderWidth: 1, borderColor: '#EAEAEA', padding: 0}}>
        {dataRows}
    </View>;
};

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
        const dataCurrentNPV = this.props.navigation.getParam('CurrentNPV', [0]);
        const dataCashFlow = this.props.navigation.getParam('CashFlow', [0]);

        let gridStep = 100;
        if (dataCurrentNPV[1]) {
            if (dataCurrentNPV[1] > 1000) {
                gridStep = 1000;
            }
            if (dataCurrentNPV[1] > 10000) {
                gridStep = 50000;
            }
            if (dataCurrentNPV[1] > 50000) {
                gridStep = 50000;
            }
            if (dataCurrentNPV[1] > 100000) {
                gridStep = 100000;
            }
            if (dataCurrentNPV[1] > 500000) {
                gridStep = 500000;
            }
            if (dataCurrentNPV[1] > 1000000) {
                gridStep = 1000000;
            }
            if (dataCurrentNPV[1] > 10000000) {
                gridStep = 10000000;
            }
            if (dataCurrentNPV[1] > 100000000) {
                gridStep = 100000000;
            }
            if (dataCurrentNPV[1] > 1000000000) {
                gridStep = 1000000000;
            }
        }

        const config = {
            line: {
                visible: true,
                strokeWidth: 2,
                strokeColor: '#ffa726',
            },
            area: {
                visible: true,
                gradientFrom: '#ffa726',
                gradientFromOpacity: 0.5,
                gradientToOpacity: 0,
            },
            tooltip: {
                visible: true,
                labelFontSize: 15,
            },
            yAxis: {
                visible: true,
                labelFormatter: v => Math.round(v / 1000) + 'K',
            },
            xAxis: {
                visible: true,
                labelFontSize: 12,
                labelColor: '#777',
            },
            grid: {
                stepSize: gridStep,
            },
            dataPoint: {
                visible: true,
                color: '#ff6312',
                radius: 4,
            },
            insetX: 16,
            insetY: 8,
        };

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
                        <View style={{height: 240}}>
                            <LineChart style={{flex: 1}} xLabels={[0, 1, 2, 3, 4, 5, 6]} config={config}
                                       data={dataCurrentNPV}/>
                        </View>
                        <ResultTable data={dataCurrentNPV}/>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Title>Динамика остатка денежных средств</Title>
                        <View style={{height: 240}}>
                            <LineChart style={{flex: 1}} xLabels={[0, 1, 2, 3, 4, 5, 6]} config={config}
                                       data={dataCashFlow}/>
                        </View>
                        <ResultTable data={dataCashFlow}/>
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
