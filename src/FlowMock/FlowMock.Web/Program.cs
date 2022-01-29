using FlowMock.Engine;
using FlowMock.Engine.Data;

Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHttpClient("proxy").ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; },
    AutomaticDecompression = System.Net.DecompressionMethods.All
});
builder.Services.AddSingleton<IDataAccess, DataAccess>();
builder.Services.AddSingleton<HttpRequestMapper>((ctx) => new HttpRequestMapper("https://api.chucknorris.io"));
builder.Services.AddSingleton<HttpResponseMapper>();
builder.Services.AddSingleton<IHttpProxier, HttpProxier>();
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseMiddleware<HttpProxierMiddleware>();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

await new DbBootstrap().SetupAsync();

app.Run();
