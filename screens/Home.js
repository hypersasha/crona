import React, {Component} from 'react';
import {
    View,
    SafeAreaView, ScrollView, StyleSheet
} from 'react-native';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

import Business from '../Utils/Business';
import Title from '../components/Title/Title';

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
            LoanCost: '',
            NumberOfServicesSoldPerYear: '',
            IncomeTaxRate: '20',
            DiscountRate: '10',
            LoanInterest: '18',
            dataset: [0],
            dataset_dynamic: [0],
        };

        this.business = new Business();

        this.OnChange = this.OnChange.bind(this);
        this.Calculate = this.Calculate.bind(this);
    }

    OnChange(event, id) {
        const text = event.nativeEvent.text;
        this.setState({
            [id]: text,
        });
    }

    Calculate() {
        this.CheckForm(); // Fill empty form fields with default values.
        this.business.Update();

        let CurrentNPV = this.business.InvestmentProjectEvaluation.CurrentNPV;
        let CashFlow = this.business.CashFlowForecast.FinancialActivities.CashBalance;
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
                    <View style={{backgroundColor: '#FFFFFF', paddingTop: 10}}>
                        <Title>Основные расходы</Title>
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
                            title={'Количество продукции'}
                            keyboardType={'decimal-pad'}
                            maxFontSizeMultiplier={1}
                            id={'NumberOfServicesSoldPerYear'}
                            description={'Укажите примерное количество товаров или услуг, которые будут продаваться в год.'}
                            onChange={this.OnChange}
                            units={'у. е.'}
                            value={this.state.NumberOfServicesSoldPerYear}
                            placeholder={'Введите количество'}/>
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
                            title={'Общепроизводные расходы'}
                            units={'у. е.'}
                            maxFontSizeMultiplier={1}
                            id={'GeneralExpenses'}
                            onChange={this.OnChange}
                            description={'Оплата аренды и т. п.'}
                            keyboardType={'decimal-pad'}
                            value={this.state.GeneralExpenses}
                            placeholder={'Введите сумму'}/>
                    </View>
                    <View style={{backgroundColor: '#FFFFFF', marginTop: 12, paddingTop: 10}}>
                        <Title>Дополнительные расходы</Title>
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
                            title={'Расходы на рекламу и сбыт'}
                            keyboardType={'decimal-pad'}
                            maxFontSizeMultiplier={1}
                            id={'AdvertisingAndMarketingExpenses'}
                            onChange={this.OnChange}
                            units={'у. е.'}
                            value={this.state.AdvertisingAndMarketingExpenses}
                            placeholder={'Введите сумму'}/>
                    </View>
                    <View style={{backgroundColor: '#FFFFFF', marginTop: 12, paddingTop: 10}}>
                        <Title>Инвестиционные расходы</Title>
                        <Input
                            title={'Стоимость кредита'}
                            keyboardType={'decimal-pad'}
                            maxFontSizeMultiplier={1}
                            id={'LoanCost'}
                            onChange={this.OnChange}
                            units={'у. е.'}
                            value={this.state.LoanCost}
                            placeholder={'Введите сумму'}/>
                        <Input
                            title={'Процент по кредиту'}
                            keyboardType={'decimal-pad'}
                            maxFontSizeMultiplier={1}
                            id={'LoanInterest'}
                            onChange={this.OnChange}
                            units={'%'}
                            value={this.state.LoanInterest}
                            placeholder={'Введите процент'}/>
                        <Input
                            title={'Налог на прибыль'}
                            keyboardType={'decimal-pad'}
                            maxFontSizeMultiplier={1}
                            id={'IncomeTaxRate'}
                            onChange={this.OnChange}
                            description={'Текущая ставка налога на прибыль.'}
                            units={'%'}
                            value={this.state.IncomeTaxRate}
                            placeholder={'Введите ставку'}/>
                        <Input
                            title={'Норма дисконта'}
                            keyboardType={'decimal-pad'}
                            maxFontSizeMultiplier={1}
                            id={'DiscountRate'}
                            onChange={this.OnChange}
                            description={'Процент по кредиту.'}
                            units={'%'}
                            value={this.state.DiscountRate}
                            placeholder={'Например, 10'}/>
                        <Button onPress={this.Calculate}></Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#F5F5F5',
    },
    contentContainer: {
        paddingBottom: 20,
    },
});

export default Home;
