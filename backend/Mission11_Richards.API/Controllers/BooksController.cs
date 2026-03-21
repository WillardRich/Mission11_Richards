using Microsoft.AspNetCore.Mvc;
using Mission11_Richards.Data;
using Mission11_Richards.API.Models;
using Mission11_Richards.Data;

namespace Mission11_Richards.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetBooks(
        int pageSize = 5,
        int pageNum = 1,
        string sortBy = "title"
    )
    {
        var query = _context.Books.AsQueryable();

        if (sortBy.ToLower() == "title")
        {
            query = query.OrderBy(b => b.Title);
        }

        var books = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(books);
    }
}