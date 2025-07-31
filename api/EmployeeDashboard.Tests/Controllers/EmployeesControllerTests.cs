using EmployeeDashboard.Api.Controllers;
using EmployeeDashboard.Data.DTOs;
using EmployeeDashboard.Services;
using EmployeeDashboard.Services.Mapping;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeDashboard.Tests.Controllers
{
    public class EmployeesControllerTests
    {
        private readonly Mock<IEmployeesService> _employeesServiceMock = new();
        private readonly Mock<IMapper> _mapperMock = new();

        [Fact]
        public async Task GetUserNotes_ReturnsOk_WithNotes()
        {
            // Arrange
            var email = "test@example.com";
            var notes = new List<string> { "Note 1", "Note 2" };
            _employeesServiceMock.Setup(s => s.GetUserNotes(email))
                .ReturnsAsync(notes);

            var controller = new EmployeesController(_employeesServiceMock.Object, _mapperMock.Object);

            // Act
            var result = await controller.GetUserNotes(email);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(notes, okResult.Value);
        }

        [Fact]
        public void AddUserNote_ReturnsBadRequest_WhenNoteIsEmpty()
        {
            // Arrange
            var controller = new EmployeesController(_employeesServiceMock.Object, _mapperMock.Object);
            var noteDto = new NoteDto("");

            // Act
            var result = controller.AddUserNote("test@example.com", noteDto);

            // Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Note cannot be empty.", badRequest.Value);
        }
    }
}