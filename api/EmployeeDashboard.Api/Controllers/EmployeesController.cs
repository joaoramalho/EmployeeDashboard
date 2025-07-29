using EmployeeDashboard.Data.DTOs;
using EmployeeDashboard.Services;
using EmployeeDashboard.Services.Mapping;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController(IEmployeesService employeesService, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserListDto>>> GetUserList(int? pageSize)
    {
        var users = await employeesService.GetUsers(pageSize ?? 1);
        var userListDtos = users.Results.Select(mapper.MapToUserListDto);
        return Ok(userListDtos);
    }
}