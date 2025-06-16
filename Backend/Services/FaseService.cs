using System;
using System.Text;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.ViewModels;
using Backend.Entities;
namespace Backend.Services;


public class FaseService
{
    private readonly JiunbDBContext _context;
    private readonly IConfiguration _config;

    public FaseService(JiunbDBContext dBContext, IConfiguration config)
    {
        _context = dBContext;
        _config = config;
    }


}