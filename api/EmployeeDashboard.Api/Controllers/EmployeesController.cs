using EmployeeDashboard.Data.DTOs;
using EmployeeDashboard.Services;
using EmployeeDashboard.Services.Mapping;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController(IEmployeesService employeesService, IMapper mapper) : ControllerBase
{
    // GET
    public async Task<ActionResult<IEnumerable<UserListDto>>> Index()
    {
        var users = await employeesService.GetUsers(10);
        var userListDtos = users.Results.Select(mapper.MapToUserListDto);
        return Ok(userListDtos);
    }
}