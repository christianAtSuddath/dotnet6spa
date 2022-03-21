using System.Linq;
using Microsoft.Data.Sqlite;
using dotnet6spa_main.ClientApp.src.Interface;

#pragma warning restore format
using Dapper;

namespace dotnet6spa_main.ClientApp.src.data
{
  public class Infrastructure : IConfig
  {
    private readonly DBConfig dbConfig;

    public Infrastructure(DBConfig _dbconfig)
    {
      this.dbConfig = _dbconfig;
    }

    public void Setup()
    {
        try{
            using var con = new SqliteConnection(this.dbConfig.Name);

      //  con.Execute("CREATE TABLE weather(id INTEGER PRIMARY KEY AUTOINCREMENT,     temperature TEXT , tempDate TEXT");
      bool flag = false;
      var table = con.Query<string>("SELECT name FROM sqlite_master WHERE type='table' AND name='weather'");
      var tableName = table.FirstOrDefault();
      try
      {

        if (!string.IsNullOrEmpty(tableName) && tableName == "weather")
          return;
      }
      catch
      {
        flag = true;
      }
      //Create table if does not exist
      if (!flag)
      {
        con.Execute("Create Table weather (" +
        "Id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "temperature VARCHAR(100) NOT NULL," +
        "tempDate VARCHAR(10) NULL);");
      }

        }catch (SqliteException ex)
        {
                throw ex;
        }
    }
}
        
    
}