using EmployeeDashboard.Data.DTOs;
using EmployeeDashboard.Data.Model;

namespace EmployeeDashboard.Services.Mapping;

public class Mapper : IMapper
{
    public UserListDto MapToUserListDto(User user)
    {
        ArgumentNullException.ThrowIfNull(user);

        return new UserListDto(
            Favourite: false,
            Name: $"{user.Name.First} {user.Name.Last}",
            Email: user.Email,
            PictureUrl: user.Picture.Medium,
            Cell: user.Cell,
            Dob: new DateTimeOffset(user.Dob.Date));
    }
}