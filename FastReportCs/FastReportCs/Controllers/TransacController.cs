using FastReport.Export.PdfSimple;
using FastReport.Web;
using FastReportCs.Entities;
using FastReportCs.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.WebEncoders.Testing;
using System.Data;
using System.Linq;
using System.Security.Cryptography;

namespace FastReportCs.Controllers
{
    [Route("api/Transac")]
    [ApiController]
    public class TransacController : ControllerBase
    {
        private readonly DbContext _context;

        public TransacController(DbContext context)
        {
            _context = context;
        }
        
        [HttpPost]
        public IActionResult PostTransac(List<Transac> transacs)
        {            
            Console.WriteLine(Request.Body);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var webreport = new WebReport();
            webreport.Report.Load(Path.Combine("Report", "TransacReport.frx"));


            _context.TransacDb.AddRange(transacs);

            webreport.Report.Prepare();
            byte[] reportArray = null;
            using (MemoryStream ms = new MemoryStream())
            {
                var pdfexport = new PDFSimpleExport();
                pdfexport.Export(webreport.Report, ms);
                ms.Flush();

                reportArray = ms.ToArray();
                return File(reportArray, "Application/pdf", "Transações.pdf");
            }
        }



        [HttpGet]
        public IActionResult GetDesigner()
        {
            if (_context.TransacDb.Count != 0)
            {
                List<Transac> data = new List<Transac>(_context.TransacDb);
                _context.TransacDb.Clear();
                return Ok(data);
            }

            List<Transac> transac = new List<Transac> {
                new Transac
                {
                _id = "56218366asdvsbahmjda",
                receiver = "testReceiver",
                date = DateTime.Parse("2023-08-23 20:25:54"),
                UserId = "myid",
                value = 100
                },
                new Transac
                {
                _id = "56218366asdvsbahmjda",
                receiver = "testReceiver",
                date = DateTime.Parse("2023-08-23 20:25:54"),
                UserId = "myid",
                value = 200
                },
        };


            return Ok(transac);
        }


    }




}

    

