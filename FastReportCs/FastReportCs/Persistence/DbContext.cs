using FastReportCs.Entities;
namespace FastReportCs.Persistence
{
    public class DbContext
    {
        public List<Worker> WorkersDb{ get; set; }
        public List<Transac> TransacDb { get; set; }

        public DbContext()
        {
            WorkersDb = new List<Worker>();
            TransacDb = new List<Transac>();

        }
    }
}
