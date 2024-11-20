
namespace portfolio.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var OriginsAllowedPolicyName = "corsPolicy";

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: OriginsAllowedPolicyName,
                                  policy =>
                                  {
                                      policy.WithOrigins("https://localhost:7224/",
                                                          "https://localhost:5173/",
                                                          "https://localhost:5173");
                                  });
            });

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors(OriginsAllowedPolicyName);
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
