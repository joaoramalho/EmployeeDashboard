using System.Net.Http.Json;
using System.Text.Json;
using EmployeeDashboard.Data.Model;
using Microsoft.Extensions.Configuration;

namespace EmployeeDashboard.Services;

public sealed class EmployeesService(IHttpClientFactory httpClientFactory, IConfiguration configuration) : IEmployeesService
{
    public async Task<UserApiResponse> GetUsers(int? pageSize)
    {
        string? usersApi = configuration["UsersApi:Name"];
        ArgumentException.ThrowIfNullOrEmpty(usersApi);

        try
        {
            var client = httpClientFactory.CreateClient(usersApi);
            var response = await client.GetFromJsonAsync<UserApiResponse>(
                $"?results={pageSize ?? 1}", new JsonSerializerOptions(JsonSerializerOptions.Web));
            return response ?? new UserApiResponse(new List<User>());
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}