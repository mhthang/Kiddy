using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Models.ViewModel
{
    public class ListRoleGroupsViewModel
    {
        public List<RoleGroupViewModel> RoleGroups { get; set; }
        public string IdUser { get; set; }
    }
    public class RoleGroupViewModel
    {
        public string RoleName { get; set; }
        public string RoleId { get; set; }
        public bool IsChecked { get; set; }
        public bool IsActiveAgo { get; set; }
    }
}
