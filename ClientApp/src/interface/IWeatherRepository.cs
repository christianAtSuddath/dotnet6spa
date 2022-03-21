using dotnet6spa_main.ClientApp.src.weather;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace dotnet6spa_main.ClientApp.src.Interface
{
    public interface IWeatherRepository
    {
        Task Add(WeatherModel weather);

        Task <IEnumerable<WeatherModel>> GetAll();

       Task Update(WeatherModel model);

       Task Delete (int Id);

    }
}