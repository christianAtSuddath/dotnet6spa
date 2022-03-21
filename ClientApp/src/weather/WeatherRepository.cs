using System.Collections.Generic;
using Dapper;
using Microsoft.Data.Sqlite;
using dotnet6spa_main.ClientApp.src.data;
using dotnet6spa_main.ClientApp.src.Interface;
using Microsoft.AspNetCore.Mvc;

namespace dotnet6spa_main.ClientApp.src.weather
{
  public class WeatherRepository : IWeatherRepository
  {
    private readonly DBConfig dbCOnfig;

    public WeatherRepository(DBConfig _dbconfig)
    {
      dbCOnfig = _dbconfig;
    }

    public async Task Add(WeatherModel model)
    {
      try
      {
        WeatherModel weather = new WeatherModel();
        if (model != null)
        {
          using var con = new SqliteConnection(this.dbCOnfig.Name);
          await con.ExecuteAsync("INSERT INTO Weather(Temperature, TempDate)VALUES(@Temperature,@TempDate)", model);
        }
      }
      catch (SqliteException ex)
      {
        throw ex;
      }
    }

    public async Task<IEnumerable<WeatherModel>> GetAll()
    {
      using var con = new SqliteConnection(this.dbCOnfig.Name);
      return await con.QueryAsync<WeatherModel>("SELECT Id, Temperature, TempDate FROM Weather");
    }

    public async Task Update(WeatherModel model)
    {
      try
      {
        using var con = new SqliteConnection(this.dbCOnfig.Name);
        WeatherModel weather = new WeatherModel();
        if (model != null)
        {
          weather.Id = model.Id;
          weather.TempDate = model.TempDate;
          weather.Temperature = model.Temperature;
        }
        await con.QueryFirstOrDefaultAsync("UPDATE Weather SET Temperature = @Temperature, TempDate=@TempDate WHERE Id=@Id", weather);
      }
      catch (SqliteException ex)
      {
        throw ex;
      }
    }

    public async Task Delete(int Id)
    {
      try
      {
        using var con = new SqliteConnection(this.dbCOnfig.Name);
        await con.ExecuteAsync("DELETE FROM Weather WHERE Id= @Id", new { Id });
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

  }
}