namespace EmployeeDashboard.Data.DTOs;

public record UserListDto(bool Favourite, string Name, string Email, DateTimeOffset Dob);
public record UserDetailDto(
    bool Favourite,
    string Title,
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    string Cell,
    DateTimeOffset Dob,
    string PictureUrl
);