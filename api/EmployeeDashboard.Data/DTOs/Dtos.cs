namespace EmployeeDashboard.Data.DTOs;

public record UserListDto(
    bool Favourite,
    string Name,
    string Email,
    string Cell,
    string PictureUrl,
    DateTimeOffset Dob);
    
public record NoteDto(string Note);