using Microsoft.AspNetCore.Mvc;
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

    // ✅ GET BOOKS (FILTER + SORT + PAGINATION)
    [HttpGet]
    public IActionResult GetBooks(
        int pageSize = 5,
        int pageNum = 1,
        string sortBy = "title",
        [FromQuery] List<string>? categories = null
    )
    {
        var query = _context.Books.AsQueryable();

        // ✅ FILTER (supports multiple formats)
        if (categories != null && categories.Any())
        {
            // Handles both:
            // categories=Fiction&categories=History
            // AND categories=Fiction,History
            var expandedCategories = categories
                .SelectMany(c => c.Split(',', StringSplitOptions.RemoveEmptyEntries))
                .Select(c => c.Trim())
                .ToList();

            query = query.Where(b => expandedCategories.Contains(b.Category));
        }

        // ✅ SORT
        if (sortBy.ToLower() == "title")
        {
            query = query.OrderBy(b => b.Title);
        }

        // ✅ TOTAL COUNT (before pagination)
        var totalNumBooks = query.Count();

        // ✅ PAGINATION
        var books = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        // ✅ RETURN FORMAT MATCHES FRONTEND
        return Ok(new
        {
            books = books,
            totalNumBooks = totalNumBooks
        });
    }

    // ✅ GET DISTINCT CATEGORIES
    [HttpGet("categories")]
    public IActionResult GetBookCategories()
    {
        var categories = _context.Books
            .Select(b => b.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToList();

        return Ok(categories);
    }
}