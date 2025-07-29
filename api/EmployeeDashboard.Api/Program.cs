using EmployeeDashboard.Services;
using EmployeeDashboard.Services.Mapping;

var builder = WebApplication.CreateBuilder(args);

//For demonstration purposes, we are allowing all origins, methods, and headers.
// In production, we should restrict this to specific origins and methods as needed.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddScoped<IEmployeesService, EmployeesService>();
builder.Services.AddTransient<IMapper, Mapper>();

string? usersApi = builder.Configuration["UsersApi:Name"];
ArgumentException.ThrowIfNullOrEmpty(usersApi);

builder.Services.AddHttpClient(usersApi,client =>
{
    client.BaseAddress = new Uri(builder.Configuration["UsersApi:BaseUrl"]!);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");
app.MapControllers();

app.Run();
