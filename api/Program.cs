using CatFactAPI.Services;
using CatFactAPI.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var catFactBaseUrl = builder.Configuration["CatFactApi:BaseUrl"]
    ?? throw new InvalidOperationException("CatFactApi:BaseUrl is not configured");

builder.Services.AddHttpClient<ICatFactService, CatFactService>(client =>
{
    client.BaseAddress = new Uri(catFactBaseUrl);
});
builder.Services.AddScoped<IFactFileWriter, FactFileWriter>();


var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(myAllowSpecificOrigins);
app.UseAuthorization();
app.MapControllers();
app.Run();
