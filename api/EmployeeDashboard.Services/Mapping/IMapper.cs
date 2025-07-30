using EmployeeDashboard.Data.DTOs;
using EmployeeDashboard.Data.Model;

namespace EmployeeDashboard.Services.Mapping;

public interface IMapper
{
    UserListDto MapToUserListDto(User user);
}