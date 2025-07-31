using EmployeeDashboard.Services;
using Moq;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Moq.Protected;
using Xunit;

namespace EmployeeDashboard.Tests.Services;

public class EmployeesServiceTests
{
    private readonly Mock<IHttpClientFactory> _httpClientFactoryMock;
    private readonly Mock<IConfiguration> _configurationMock;

    public EmployeesServiceTests()
    {
        Mock<HttpMessageHandler> handlerMock = new();
        handlerMock.Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>())
            .ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(MockData.fakeResponse),
            });

        var httpClient = new HttpClient(handlerMock.Object)
        {
            BaseAddress = new Uri("https://api.example.com/"),
            DefaultRequestHeaders =
            {
                { "Accept", "application/json" }
            }
        };
        
        _httpClientFactoryMock = new Mock<IHttpClientFactory>();
        _httpClientFactoryMock
            .Setup(f => f.CreateClient(It.IsAny<string>()))
            .Returns(httpClient);
        
        
        _configurationMock = new Mock<IConfiguration>();
        _configurationMock
            .Setup(c => c["UsersApi:Name"])
            .Returns("TestApi");
    }

    [Fact]
    public async Task GetAllEmployeesTest()
    {
        var employeesService = new EmployeesService(_httpClientFactoryMock.Object, _configurationMock.Object);
        
        var result = await employeesService.GetUsers(1);
        
        Assert.NotNull(result);
        Assert.NotEmpty(result.Results);
        Assert.Single(result.Results);
    }
}
