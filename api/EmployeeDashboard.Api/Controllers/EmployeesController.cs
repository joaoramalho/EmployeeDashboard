using EmployeeDashboard.Data;
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

    [HttpGet("{email}/notes")]
    public async Task<ActionResult<IEnumerable<string>>> GetUserNotes(string email)
    {
        var notes = await employeesService.GetUserNotes(email);
        return Ok(notes);
    }

    [HttpPost("{email}/notes")]
    public IActionResult AddUserNote(string email, [FromBody] NoteDto noteDto)
    {
        if (string.IsNullOrWhiteSpace(noteDto.Note))
        {
            return BadRequest("Note cannot be empty.");
        }

        StaticData.employeeNotes.Add(noteDto.Note);

        return Ok(StaticData.employeeNotes);
    }
}