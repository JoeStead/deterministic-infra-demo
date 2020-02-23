using System;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Bogus;
using Microsoft.Extensions.Configuration;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace BankTrackingLambda
{
    public class LambdaEntryPoint
    {
        private readonly IConfiguration configuration;
        private IConfigurationRoot _config;
        private Faker<Data> dataGen;

        public LambdaEntryPoint()
        {
            _config = new ConfigurationBuilder().AddEnvironmentVariables().Build();
            this.dataGen = new Faker<Data>()
            .RuleFor(data => data.BankName, _config["BankToTrack"])
            .RuleFor(data => data.AccountNumber, faker => faker.Finance.Account())
            .RuleFor(data => data.Currency, faker => faker.Finance.Currency().Code)
            .RuleFor(data => data.Amount, faker => faker.Finance.Amount(Decimal.Zero, 250000, 2));
        }

        public Data Handle(ILambdaContext context)
        {
            context.Logger.Log(_config["BankToTrack"]);

            return this.dataGen.Generate();
        }
    }

    public class Data
    {
        public string BankName { get; set; }
        public string AccountNumber { get; set; }
        public string Currency { get; set; }
        public decimal Amount { get; set; }
    }

}