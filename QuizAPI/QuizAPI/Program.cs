using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Quiz
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("QuizConnection"));
});

builder.Services.AddCors(options => options.AddPolicy(name: "Quiz",
    policy =>
    {
        policy.WithOrigins("https://quizgame-b900f.web.app").AllowAnyMethod().AllowAnyHeader();
    }));

//Score
builder.Services.AddDbContext<ScoreContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ScoreConnection"));
});

builder.Services.AddCors(options => options.AddPolicy(name: "Score",
    policy =>
    {
        policy.WithOrigins("https://quizgame-b900f.web.app").AllowAnyMethod().AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Quiz");
app.UseCors("Score");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
