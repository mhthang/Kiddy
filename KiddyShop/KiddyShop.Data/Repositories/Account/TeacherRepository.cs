using KiddyShop.Account.Models;
using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Account.Repositories
{
    public class TeacherRepository : Repository<Teacher, System.Guid>, ITeacherRepository
    {
        public TeacherRepository(IKSDataContext context) : base(context)
        {

        }
        public int countTeachers
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public int CountSemesterTeacher(Guid semesterId)
        {
            throw new NotImplementedException();
        }

        public Teacher CreateTeacher(Guid divisionId, string firstName, string lastName, string email, string phone, string highlightColor, bool isActive)
        {
            throw new NotImplementedException();
        }

        public List<Teacher> GetAvailableSemesterHomeroomTeachers(Guid semesterId)
        {
            throw new NotImplementedException();
        }

        public List<Teacher> GetSemesterTeacher(Guid semesterId)
        {
            throw new NotImplementedException();
        }

        public List<Teacher> GetTeachersForClassCourse(Guid classCourseId)
        {
            throw new NotImplementedException();
        }

        public List<Teacher> GetTeachersForCourse(Guid courseId)
        {
            throw new NotImplementedException();
        }

        public List<Teacher> SearchSemesterTeacher(Guid semesterId, Guid? divisionId, string filter, int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public List<Teacher> SearchTeacher(string filter, int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Teacher UpdateTeacher(Guid id, Guid divisionId, string firstName, string lastName, string email, string phone, string highlightColor, bool isActive)
        {
            throw new NotImplementedException();
        }
    }
}
