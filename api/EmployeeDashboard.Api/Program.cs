using EmployeeDashboard.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddScoped<IEmployeesService, EmployeesService>();

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

//app.UseHttpsRedirection();
app.MapControllers();

app.Run();
