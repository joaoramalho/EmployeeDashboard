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
            Dob: new DateTimeOffset(user.Dob.Date));
    }

    public UserDetailDto MapToUserDetailDto(User user)
    {
        ArgumentNullException.ThrowIfNull(user);

        return new UserDetailDto(
            Favourite: false,
            Title: user.Name.Title,
            FirstName: user.Name.First,
            LastName: user.Name.Last,
            Email: user.Email,
            Phone: user.Phone,
            Cell: user.Cell,
            Dob: new DateTimeOffset(user.Dob.Date),
            PictureUrl: user.Picture?.Large ?? string.Empty);
    }
}