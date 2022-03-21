using dotnet6spa_main.ClientApp.src.data;
using dotnet6spa_main.ClientApp.src.Interface;
using dotnet6spa_main.ClientApp.src.weather;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = "Data source=weather.sqlite";
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddSingleton(new DBConfig{ Name = connectionString});
builder.Services.AddSingleton<IConfig, Infrastructure>();
builder.Services.AddSingleton<IWeatherRepository, WeatherRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
  //app cors
    app.UseCors("corsapp");
    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.UseStaticFiles();
    app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
