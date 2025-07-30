using EmployeeDashboard.Data.Model;

namespace EmployeeDashboard.Services;

public interface IEmployeesService
{ 
    Task<UserApiResponse> GetUsers(int pageSize);
    Task<List<string>> GetUserNotes(string email);
}