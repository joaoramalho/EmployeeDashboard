using EmployeeDashboard.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController(IEmployeesService employeesService) : ControllerBase
{
    // GET
    public async Task<IActionResult> Index()
    {
        var users = await employeesService.GetUsers(10);
        return Ok(users);
    }
}