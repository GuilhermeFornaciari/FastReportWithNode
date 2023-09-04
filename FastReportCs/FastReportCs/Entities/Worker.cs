namespace FastReportCs.Entities
{
    public class Worker
    {   
        public string _id { get; set; }
        public string ename { get; set; }
        public string surname { get; set; }
        public string email { get; set; }
        public DateTime hiringDate { get; set; }
        public string role { get; set; }
        public string userid { get; set; }
        public int presence { get; set; }
        public int absence { get; set; }

        public override string ToString()
        {
            return $"{_id}: {ename} {surname} \n Email: {email}";
        }

    }
}