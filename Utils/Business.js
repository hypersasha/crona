class Business {
    constructor() {

        this.LoanCost = 10000;
        this.LoanYears = 5;
        this.EquipmentSalesRatio = 0.05;
        this.NumberOfServicesSoldPerYear = 10380;
        this.IncomeTaxRate = 20;
        this.DiscountRate = 10;
        this.LoanInterest = 18;
        this.LoanRepayment = [];
        for (let i = 0; i < this.LoanYears; i++) {
            this.LoanRepayment.push(this.LoanCost / this.LoanYears);
        }

        this.UnitSalesPrice = 48;
        this.UnitPrice = 33;
        this.Salary = 44880;
        this.GeneralExpenses = 29504;
        this.ManagementExpenses = 1200;
        this.AdvertisingAndMarketingExpenses = 24000;
        this.InflationUnitSalesPrice = 0.0;
        this.InflationUnitPrice = 0.0;
        this.InflationSalary = 0.0;
        this.InflationGeneralExpenses = 0.0;
        this.InflationManagementExpenses = 0.0;
        this.InflationAdvertisingAndMarketingExpenses = 0.0;

        this.Receivables = 365;
        this.Stocks = 365;
        this.DebtToSuppliers = 365;
        this.PayrollDebt = 26;

        this.ImplementationForecast = null;
        this.CostStructure = null;
        this.BankSettlementPlan = null;
        this.ForecastChangesInWorkingCapital = null;
        this.ProfitAndLossForecast = null;
        this.CashFlowForecast = null;
        this.InvestmentProjectEvaluation = null;
    }

    DecisionImplementationForecast() {
        let Indicators = {
            NumberOfProductsSold: [],
            PricePerUnit: [],
            RevenuesFromSales: []
        };

        this.LoanRepayment.map((RepaymentCost, index) => {
            Indicators.NumberOfProductsSold.push(this.NumberOfServicesSoldPerYear);
            Indicators.PricePerUnit.push((index === 0 ? this.UnitSalesPrice : (Indicators.PricePerUnit[index-1] * (1 + this.InflationUnitSalesPrice))));
            Indicators.RevenuesFromSales.push(Indicators.NumberOfProductsSold[index] * Indicators.PricePerUnit[index]);
        });

        return Indicators;
    }

    DecisionCostStructure() {
        let Indicators = {
            RawMaterialCosts: [],
            RemunerationOfLabor: [],
            GeneralExpenses: [],
            ManagementExpenses: [],
            AdvertisingAndMarketingExpenses: [],
            DepreciationOfEquipment: [],
            TotalExpenses: []
        };

        this.LoanRepayment.map((RepaymentCost, index) => {
            Indicators.RawMaterialCosts.push((index === 0 ? this.NumberOfServicesSoldPerYear * this.UnitPrice * -1 : (Indicators.RawMaterialCosts[index - 1] * (1 + this.InflationUnitPrice))));
            Indicators.RemunerationOfLabor.push((index === 0 ? this.Salary * -1 : (Indicators.RemunerationOfLabor[index - 1] * (1 + this.InflationSalary))));
            Indicators.GeneralExpenses.push((index === 0 ? this.GeneralExpenses * -1 : (Indicators.GeneralExpenses[index - 1] * (1 + this.InflationGeneralExpenses))));
            Indicators.ManagementExpenses.push((index === 0 ? this.ManagementExpenses * -1 : (Indicators.ManagementExpenses[index - 1] * (1 + this.InflationManagementExpenses))));
            Indicators.AdvertisingAndMarketingExpenses.push((index === 0 ? this.AdvertisingAndMarketingExpenses * -1 : (Indicators.AdvertisingAndMarketingExpenses[index - 1] * (1 + this.InflationAdvertisingAndMarketingExpenses))));
            Indicators.DepreciationOfEquipment.push((index === 0 ? this.LoanCost / this.LoanRepayment.length * -1 : Indicators.DepreciationOfEquipment[index - 1]));
            Indicators.TotalExpenses.push(Indicators.RawMaterialCosts[index] + Indicators.RemunerationOfLabor[index] + Indicators.GeneralExpenses[index] + Indicators.ManagementExpenses[index] + Indicators.AdvertisingAndMarketingExpenses[index] + Indicators.DepreciationOfEquipment[index]);
        });

        return Indicators;
    }

    DecisionBankSettlementPlan() {
        let Indicators = {
            GettingLoan: this.LoanCost,
            LoanRepayment: [],
            DebtBalance: [],
            InterestPayment: [],
        };

        this.LoanRepayment.map((RepaymentCost, index) => {
            Indicators.LoanRepayment.push(RepaymentCost * -1);
            Indicators.DebtBalance.push((index === 0 ? Indicators.GettingLoan - RepaymentCost : Indicators.DebtBalance[index - 1] - RepaymentCost));
            Indicators.InterestPayment.push((index === 0 ? Indicators.GettingLoan * this.LoanInterest / 100 * -1 : Indicators.DebtBalance[index - 1] * this.LoanInterest / 100 * -1));
        });

        return Indicators;
    }

    DecisionForecastChangesInWorkingCapital() {
        let Indicators = {
            Receivables: [],
            Stocks: [],
            DebtToSuppliers: [],
            PayrollDebt: [],
            WorkingCapitalRequirement: [],
            WorkingCapitalChange: []
        };

        this.LoanRepayment.map((RepaymentCost, index) => {
            Indicators.Receivables.push(this.ImplementationForecast.RevenuesFromSales[index] / this.Receivables * -1);
            Indicators.Stocks.push(this.CostStructure.RawMaterialCosts[index] / this.Stocks);
            Indicators.DebtToSuppliers.push(this.CostStructure.RawMaterialCosts[index] / this.DebtToSuppliers * -1);
            Indicators.PayrollDebt.push(this.CostStructure.RemunerationOfLabor[index] / this.PayrollDebt * -1);
            Indicators.WorkingCapitalRequirement.push(Indicators.Receivables[index] + Indicators.Stocks[index] + Indicators.DebtToSuppliers[index] + Indicators.PayrollDebt[index]);
            Indicators.WorkingCapitalChange.push((index === 0 ? Indicators.WorkingCapitalRequirement[index] : Indicators.WorkingCapitalRequirement[index] - Indicators.WorkingCapitalRequirement[index - 1]));
        });

        // TODO: Удалить, если нигде дальше не потребуется
        Indicators.WorkingCapitalChange.push(Indicators.WorkingCapitalRequirement[Indicators.WorkingCapitalRequirement.length - 1] * -1);

        return Indicators;
    }

    DecisionProfitAndLossForecast() {
        let Indicators = {
            Profit: {
                RevenuesFromSales: [],
                AssetSaleIncome: [],
                TotalIncome: []
            },
            Loss: {
                RawMaterialCosts: [],
                RemunerationOfLabor: [],
                GeneralExpenses: [],
                ManagementExpenses: [],
                AdvertisingAndMarketingExpenses: [],
                DepreciationOfEquipment: [],
                TotalCost: [],
            },
            ProfitBeforeTax: [],
            IncomeTax: [],
            NetProfit: [],
            InterestPayment: [],
            RetainedEarnings: [],
        };

        this.LoanRepayment.map((RepaymentCost, index) => {
            Indicators.Profit.RevenuesFromSales.push(this.ImplementationForecast.RevenuesFromSales[index]);
            Indicators.Profit.AssetSaleIncome.push(0);
            Indicators.Profit.TotalIncome.push(Indicators.Profit.RevenuesFromSales[index] + Indicators.Profit.AssetSaleIncome[index]);

            Indicators.Loss.RawMaterialCosts.push(this.CostStructure.RawMaterialCosts[index]);
            Indicators.Loss.RemunerationOfLabor.push(this.CostStructure.RemunerationOfLabor[index]);
            Indicators.Loss.GeneralExpenses.push(this.CostStructure.GeneralExpenses[index]);
            Indicators.Loss.ManagementExpenses.push(this.CostStructure.ManagementExpenses[index]);
            Indicators.Loss.AdvertisingAndMarketingExpenses.push(this.CostStructure.AdvertisingAndMarketingExpenses[index]);
            Indicators.Loss.DepreciationOfEquipment.push(this.CostStructure.DepreciationOfEquipment[index]);
            Indicators.Loss.TotalCost.push(Indicators.Loss.RawMaterialCosts[index] + Indicators.Loss.RemunerationOfLabor[index] + Indicators.Loss.GeneralExpenses[index] + Indicators.Loss.ManagementExpenses[index] + Indicators.Loss.AdvertisingAndMarketingExpenses[index] + Indicators.Loss.DepreciationOfEquipment[index]);

            Indicators.ProfitBeforeTax.push(Indicators.Profit.TotalIncome[index] + Indicators.Loss.TotalCost[index]);
            Indicators.IncomeTax.push(Indicators.ProfitBeforeTax[index] * this.IncomeTaxRate / 100);
            Indicators.NetProfit.push(Indicators.ProfitBeforeTax[index] - Indicators.IncomeTax[index]);
            Indicators.InterestPayment.push(this.BankSettlementPlan.InterestPayment[index]);
            Indicators.RetainedEarnings.push(Indicators.NetProfit[index] + Indicators.InterestPayment[index]);
        });

        Indicators.Profit.RevenuesFromSales.push(0);
        Indicators.Profit.AssetSaleIncome.push(this.LoanCost * this.EquipmentSalesRatio);
        Indicators.Profit.TotalIncome.push(Indicators.Profit.RevenuesFromSales[Indicators.Profit.RevenuesFromSales.length - 1] + Indicators.Profit.AssetSaleIncome[Indicators.Profit.AssetSaleIncome.length - 1]);

        Indicators.Loss.TotalCost.push(0);

        Indicators.ProfitBeforeTax.push(Indicators.Profit.TotalIncome[Indicators.Profit.TotalIncome.length - 1] + Indicators.Loss.TotalCost[Indicators.Loss.TotalCost.length - 1]);
        Indicators.IncomeTax.push(Indicators.ProfitBeforeTax[Indicators.ProfitBeforeTax.length - 1] * this.IncomeTaxRate / 100);
        Indicators.NetProfit.push(Indicators.ProfitBeforeTax[Indicators.ProfitBeforeTax.length - 1] -  Indicators.IncomeTax[ Indicators.IncomeTax.length - 1]);
        Indicators.RetainedEarnings.push(Indicators.NetProfit[Indicators.NetProfit.length - 1]);

        return Indicators;
    }

    DecisionCashFlowForecast() {
        let Indicators = {
            InvestmentActivities: {
                EquipmentPurchase: [],
                SalesOfEquipment: [],
                BalanceFromInvestmentActivities: []
            },
            OperatingActivities: {
                RevenuesFromSales: [],
                RawMaterialCosts: [],
                RemunerationOfLabor: [],
                GeneralExpenses: [],
                ManagementExpenses: [],
                AdvertisingAndMarketingExpenses: [],
                IncomeTax: [],
                WorkingCapitalChange: [],
                BalanceFromOperatingActivities: [],
            },
            FinancialActivities: {
                BalanceFromFinancialActivities: [],
                TotalBalance: [],
                CashBalance: [],
            }
        };

        this.LoanRepayment.map((RepaymentCost, index) => {
            Indicators.InvestmentActivities.EquipmentPurchase.push(0);
            Indicators.InvestmentActivities.SalesOfEquipment.push(0);
            Indicators.InvestmentActivities.BalanceFromInvestmentActivities.push(0);

            Indicators.OperatingActivities.RevenuesFromSales.push(this.ProfitAndLossForecast.Profit.RevenuesFromSales[index]);
            Indicators.OperatingActivities.RawMaterialCosts.push(this.ProfitAndLossForecast.Loss.RawMaterialCosts[index]);
            Indicators.OperatingActivities.RemunerationOfLabor.push(this.ProfitAndLossForecast.Loss.RemunerationOfLabor[index]);
            Indicators.OperatingActivities.GeneralExpenses.push(this.ProfitAndLossForecast.Loss.GeneralExpenses[index]);
            Indicators.OperatingActivities.ManagementExpenses.push(this.ProfitAndLossForecast.Loss.ManagementExpenses[index]);
            Indicators.OperatingActivities.AdvertisingAndMarketingExpenses.push(this.ProfitAndLossForecast.Loss.AdvertisingAndMarketingExpenses[index]);
            Indicators.OperatingActivities.IncomeTax.push(this.ProfitAndLossForecast.IncomeTax[index] * -1);
            Indicators.OperatingActivities.WorkingCapitalChange.push(this.ForecastChangesInWorkingCapital.WorkingCapitalChange[index]);
            Indicators.OperatingActivities.BalanceFromOperatingActivities.push(
                Indicators.OperatingActivities.RevenuesFromSales[index] +
                Indicators.OperatingActivities.RawMaterialCosts[index] +
                Indicators.OperatingActivities.RemunerationOfLabor[index] +
                Indicators.OperatingActivities.GeneralExpenses[index] +
                Indicators.OperatingActivities.ManagementExpenses[index] +
                Indicators.OperatingActivities.AdvertisingAndMarketingExpenses[index] +
                Indicators.OperatingActivities.IncomeTax[index] +
                Indicators.OperatingActivities.WorkingCapitalChange[index]
            );

            Indicators.FinancialActivities.BalanceFromFinancialActivities.push(this.LoanRepayment[index] * -1 + this.BankSettlementPlan.InterestPayment[index]);
            Indicators.FinancialActivities.TotalBalance.push(Indicators.InvestmentActivities.BalanceFromInvestmentActivities[index] + Indicators.OperatingActivities.BalanceFromOperatingActivities[index] + Indicators.FinancialActivities.BalanceFromFinancialActivities[index]);
            Indicators.FinancialActivities.CashBalance.push((index === 0 ? Indicators.FinancialActivities.TotalBalance[index] : Indicators.FinancialActivities.CashBalance[index - 1] + Indicators.FinancialActivities.TotalBalance[index]));
        });

        Indicators.InvestmentActivities.EquipmentPurchase.push(this.LoanCost * this.EquipmentSalesRatio);
        Indicators.InvestmentActivities.BalanceFromInvestmentActivities.push(Indicators.InvestmentActivities.BalanceFromInvestmentActivities[Indicators.InvestmentActivities.BalanceFromInvestmentActivities.length - 1] + Indicators.InvestmentActivities.EquipmentPurchase[Indicators.InvestmentActivities.EquipmentPurchase.length - 1]);

        Indicators.OperatingActivities.IncomeTax.push(-1 * this.ProfitAndLossForecast.IncomeTax[this.ProfitAndLossForecast.IncomeTax.length - 1]);
        Indicators.OperatingActivities.WorkingCapitalChange.push(this.ForecastChangesInWorkingCapital.WorkingCapitalChange[this.ForecastChangesInWorkingCapital.WorkingCapitalChange.length - 1]);
        Indicators.OperatingActivities.BalanceFromOperatingActivities.push(Indicators.OperatingActivities.IncomeTax[Indicators.OperatingActivities.IncomeTax.length - 1] + Indicators.OperatingActivities.WorkingCapitalChange[Indicators.OperatingActivities.WorkingCapitalChange.length - 1]);

        Indicators.FinancialActivities.TotalBalance.push(
            Indicators.InvestmentActivities.BalanceFromInvestmentActivities[Indicators.InvestmentActivities.BalanceFromInvestmentActivities.length - 1] +
            Indicators.OperatingActivities.BalanceFromOperatingActivities[Indicators.OperatingActivities.BalanceFromOperatingActivities.length - 1]
        );
        Indicators.FinancialActivities.CashBalance.push(Indicators.FinancialActivities.TotalBalance[Indicators.FinancialActivities.TotalBalance.length - 1] + Indicators.FinancialActivities.CashBalance[Indicators.FinancialActivities.CashBalance.length - 1]);

        return Indicators;
    }

    DecisionInvestmentProjectEvaluation() {
        let Indicators = {
            NPV: [],
            CurrentNetIncome: [],
            DiscountCoefficient: [],
            DiscountedCashFlow: [],
            CurrentNPV: [],
        };

        Indicators.NPV.push(this.LoanCost * -1);
        Indicators.CurrentNetIncome.push(Indicators.NPV[0]);
        Indicators.DiscountCoefficient.push(1/Math.pow((1 + this.DiscountRate / 100), 0));
        Indicators.DiscountedCashFlow.push(Indicators.NPV[0] * Indicators.DiscountCoefficient[0]);
        Indicators.CurrentNPV.push(Indicators.DiscountedCashFlow[0]);

        this.LoanRepayment.map((RepaymentCost, index) => {
            Indicators.NPV.push(this.CashFlowForecast.InvestmentActivities.BalanceFromInvestmentActivities[index] + this.CashFlowForecast.OperatingActivities.BalanceFromOperatingActivities[index]);
            Indicators.CurrentNetIncome.push(Indicators.NPV[index + 1] + Indicators.CurrentNetIncome[index]);
            Indicators.DiscountCoefficient.push(1/Math.pow((1 + this.DiscountRate / 100), index + 1));
            Indicators.DiscountedCashFlow.push(Indicators.NPV[index + 1] * Indicators.DiscountCoefficient[index + 1]);
            Indicators.CurrentNPV.push(Indicators.DiscountedCashFlow[index + 1] + Indicators.CurrentNPV[index]);
        });

        Indicators.NPV.push(this.CashFlowForecast.InvestmentActivities.BalanceFromInvestmentActivities[this.CashFlowForecast.InvestmentActivities.BalanceFromInvestmentActivities.length - 1] + this.CashFlowForecast.OperatingActivities.BalanceFromOperatingActivities[this.CashFlowForecast.OperatingActivities.BalanceFromOperatingActivities.length - 1]);
        Indicators.CurrentNetIncome.push(Indicators.NPV[Indicators.NPV.length - 1] + Indicators.CurrentNetIncome[Indicators.CurrentNetIncome.length - 1]);
        Indicators.DiscountCoefficient.push(1/Math.pow((1 + this.DiscountRate / 100), Indicators.DiscountCoefficient.length));
        Indicators.DiscountedCashFlow.push(Indicators.NPV[Indicators.NPV.length - 1] * Indicators.DiscountCoefficient[Indicators.DiscountCoefficient.length - 1]);
        Indicators.CurrentNPV.push(Indicators.DiscountedCashFlow[Indicators.DiscountedCashFlow.length - 1] + Indicators.CurrentNPV[Indicators.CurrentNPV.length - 1]);

        return Indicators;
    }

    Update() {
        this.LoanRepayment = [];
        for (let i = 0; i < this.LoanYears; i++) {
            this.LoanRepayment.push(this.LoanCost / this.LoanYears);
        }

        this.ImplementationForecast = this.DecisionImplementationForecast();
        this.CostStructure = this.DecisionCostStructure();
        this.BankSettlementPlan = this.DecisionBankSettlementPlan();
        this.ForecastChangesInWorkingCapital = this.DecisionForecastChangesInWorkingCapital();
        this.ProfitAndLossForecast = this.DecisionProfitAndLossForecast();
        this.CashFlowForecast = this.DecisionCashFlowForecast();
        this.InvestmentProjectEvaluation = this.DecisionInvestmentProjectEvaluation();

    }
}

export default Business;
