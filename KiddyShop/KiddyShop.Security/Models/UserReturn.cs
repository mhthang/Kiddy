using System.Collections.Generic;

namespace KiddyShop.WebSecurity.Models
{
    public class UserReturn
    {
        public string Url { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public IList<System.Security.Claims.Claim> Claims { get; set; }
    }
}