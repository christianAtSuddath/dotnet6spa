
using Microsoft.AspNetCore.Mvc;
using dotnet6spa_main.ClientApp.src.Interface;
using dotnet6spa_main.ClientApp.src.weather;
namespace dotnet6spa_main.Controllers
{   
    [ApiController]
    [Produces("application/json")]
    [Route("[controller]")]
    public class WeatherController:ControllerBase
    {
        private readonly IWeatherRepository weatherRepository;
        public WeatherController(IWeatherRepository _weatherRepository)
        {
            this.weatherRepository = _weatherRepository;
        }

        [HttpPost]
        [Route("add")]
        public async Task Add([FromBody]WeatherModel model)
        {
            await this.weatherRepository.Add(model);
        }

       [HttpGet]
       [Route("getall")]
        public async Task<IEnumerable<WeatherModel>>GetAll(){
            return  await this.weatherRepository.GetAll();
        }

       [HttpPut]
       [Route("update")]
        public async Task Update(WeatherModel model){
            await this.weatherRepository.Update(model);
        }

         [HttpDelete]
         [Route("delete")]
        public async Task Delete(int Id){
            await this.weatherRepository.Delete(Id);
        }
    }
}