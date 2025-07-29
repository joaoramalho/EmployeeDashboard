namespace EmployeeDashboard.Data.Model;

public record UserApiResponse(List<User> Results);

public record User(
    string Gender,
    Name Name,
    Location Location,
    string Email,
    Login Login,
    DateInfo Dob,
    DateInfo Registered,
    string Phone,
    string Cell,
    Id Id,
    Picture Picture,
    string Nat
);

public record Name(
    string Title,
    string First,
    string Last
);

public record Location(
    Street Street,
    string City,
    string State,
    string Country,
    object Postcode,
    Coordinates Coordinates,
    Timezone Timezone
);

public record Street(
    int Number,
    string Name
);

public record Coordinates(
    string Latitude,
    string Longitude
);

public record Timezone(
    string Offset,
    string Description
);

public record Login(
    string Uuid,
    string Username,
    string Password,
    string Salt,
    string Md5,
    string Sha1,
    string Sha256
);

public record DateInfo(
    DateTime Date,
    int Age
);

public record Id(
    string Name,
    string? Value
);

public record Picture(
    string Large,
    string Medium,
    string Thumbnail
);