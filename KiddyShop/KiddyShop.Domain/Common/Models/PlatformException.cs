namespace KiddyShop.Domain.Models
{
    public class PlatformException
    {
        public int ExceptionId { get; set; }
        public string ApplicationName { get; set; }
        public string ExMessage { get; set; }
        public string ExType { get; set; }
        public string StackTrace { get; set; }
        public string EnvStackTrace { get; set; }
        public string TargetSite { get; set; }
        public string TargetSiteName { get; set; }
        public string RemoteHost { get; set; }
        public string HostName { get; set; }
        public string Source { get; set; }
        public string ControllerName { get; set; }
        public string ActionName { get; set; }
        public string Misc { get; set; }
        public string UserAgent { get; set; }
        public System.DateTime LogTime { get; set; }
    }
}
