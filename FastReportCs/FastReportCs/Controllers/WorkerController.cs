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
    [Route("api/Worker")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly DbContext _context;

        public WorkerController(DbContext context)
        {
            _context = context;
        }
        
        [HttpPost]
        public IActionResult PostWorker(List<Worker> workers)
        {
            workers.ForEach((w)=>Console.WriteLine(w.ToString()));


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var webreport = new WebReport();
            webreport.Report.Load(Path.Combine("Report", "WorkerReport.frx"));


            _context.WorkersDb.AddRange(workers);

            webreport.Report.Prepare();
            byte[] reportArray = null;
            using (MemoryStream ms = new MemoryStream())
            {
                var pdfexport = new PDFSimpleExport();
                pdfexport.Export(webreport.Report, ms);
                ms.Flush();

                reportArray = ms.ToArray();
                return File(reportArray, "Application/pdf", "Funcionarios.pdf");
            }
        }



        [HttpGet]
        public IActionResult GetDesigner()
        {
            if (_context.WorkersDb.Count != 0)
            {
                List<Worker> data = new List<Worker>(_context.WorkersDb);
                _context.WorkersDb.Clear();
                return Ok(data);
            }

            List<Worker> worker = new List<Worker> { 
                new Worker 
                {
                _id = "56218366asdvsbahmjda",
                ename = "Guilherme",
                surname = "Fornaciari",
                email = "fornac049@gmail.com",
                hiringDate = DateTime.Parse("2023-08-23 20:25:54"),
                role = "Junior",
                userid = "myid",
                presence = 13,
                absence = 1
                },
                new Worker
                {
                _id = "as218366asdvsbahmjda",
                ename = "Jandir",
                surname = "Souza",
                email = "jandir@gmail.com",
                hiringDate = DateTime.Parse("2023-08-23 20:25:54"),
                role = "Senior",
                userid = "myid",
                presence = 20,
                absence = 10
                }
        };


            return Ok(worker);
        }


    }




}

    

