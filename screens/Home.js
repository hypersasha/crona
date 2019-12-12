import React, {Component} from 'react';
import {
    View,
    SafeAreaView, ScrollView, StyleSheet, Dimensions
} from 'react-native';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Business from '../Utils/Business';

import {LineChart} from 'react-native-chart-kit';
import Title from '../components/Title/Title';
const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 167, 38, ${opacity})`,
    labelColor: (opacity = 0.8) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    propsForBackgroundLines: {
        strokeWidth: 2,
        stroke: '#d4d4d4'
    },
    propsForDots: {
        r: "6",
        color: '#ffa726'
    }
};
const screenWidth = Dimensions.get("window").width;

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            UnitSalesPrice: '',
            UnitPrice: '',
            Salary: '',
            GeneralExpenses: '',
            ManagementExpenses: '',
            AdvertisingAndMarketingExpenses: '',
            dataset: [0],
            dataset_dynamic: [0]
        };

        this.business = new Business();

        this.OnChange = this.OnChange.bind(this);
        this.Calculate = this.Calculate.bind(this);
    }

    OnChange(event, id) {
        const text = event.nativeEvent.text;
        this.setState({
            [id]: text
        })
    }

    Calculate() {
        this.CheckForm(); // Fill empty form fields with default values.
        this.business.Update();

        let CurrentNPV = this.business.InvestmentProjectEvaluation.CurrentNPV.map(elem => {
            return elem / 1000;
        });
        let CashFlow = this.business.CashFlowForecast.FinancialActivities.CashBalance.map(elem => {
            return elem / 1000;
        });
        this.setState({dataset: CurrentNPV, dataset_dynamic: CashFlow});

        // Open new window with results.
        this.props.navigation.navigate('Results', {CurrentNPV: CurrentNPV, CashFlow: CashFlow});
    }

    CheckForm() {
        let current_state = {...this.state};
        for (let key in current_state) {
            if (this.business.hasOwnProperty(key)) {
                current_state[key] = this.business[key].toString();
            }
        }
        this.setState(current_state);
    }

    componentDidUpdate() {
        console.log('=============== UPDATE ===============');
        for (let key in this.state) {
            if (this.business.hasOwnProperty(key)) {
                this.business[key] = (parseFloat(this.state[key]) || this.business[key]);
                console.log(`Updated key ${key} to ${(parseFloat(this.state[key]) || this.business[key])}`);
            }
        }
        console.log('============= END OF UPDATE =============');
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={styles.contentContainer}
                    style={styles.scrollView}>
                    <Input
                        title={'Цена продукции'}
                        units={'у. е.'}
                        maxFontSizeMultiplier={1}
                        id={'UnitSalesPrice'}
                        onChange={this.OnChange}
                        description={'Укажите ориентировочную стоимость Вашего продукта.'}
                        keyboardType={'decimal-pad'}
                        value={this.state.UnitSalesPrice}
                        placeholder={'Введите цену'}/>
                    <Input
                        title={'Цена материала'}
                        units={'у. е.'}
                        maxFontSizeMultiplier={1}
                        id={'UnitPrice'}
                        onChange={this.OnChange}
                        description={'Цена материалов за единицу.'}
                        keyboardType={'decimal-pad'}
                        value={this.state.UnitPrice}
                        placeholder={'Введите цену'}/>
                    <Input
                        title={'Оплата труда'}
                        units={'у. е.'}
                        maxFontSizeMultiplier={1}
                        id={'Salary'}
                        onChange={this.OnChange}
                        description={'Сколько средств идет на оплату труда всех сотрудников предприятия.'}
                        keyboardType={'decimal-pad'}
                        value={this.state.Salary}
                        placeholder={'Введите сумму'}/>
                    <Input
                        title={'Общепроизводные расходы'}
                        units={'у. е.'}
                        maxFontSizeMultiplier={1}
                        id={'GeneralExpenses'}
                        onChange={this.OnChange}
                        description={'Оплата аренды и т. п.'}
                        keyboardType={'decimal-pad'}
                        value={this.state.GeneralExpenses}
                        placeholder={'Введите сумму'}/>
                    <Input
                        title={'Управленческие расходы'}
                        units={'у. е.'}
                        maxFontSizeMultiplier={1}
                        id={'ManagementExpenses'}
                        onChange={this.OnChange}
                        keyboardType={'decimal-pad'}
                        value={this.state.ManagementExpenses}
                        placeholder={'Введите сумму'}/>
                    <Input
                        title={'Расходы на рекламу и сбыт'}
                        keyboardType={'decimal-pad'}
                        maxFontSizeMultiplier={1}
                        id={'AdvertisingAndMarketingExpenses'}
                        onChange={this.OnChange}
                        units={'у. е.'}
                        value={this.state.AdvertisingAndMarketingExpenses}
                        placeholder={'Введите сумму'}/>
                    <Button onPress={this.Calculate}></Button>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.white
    },
    contentContainer: {
        paddingBottom: 20
    }
});

export default Home;
