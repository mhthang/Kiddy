using KiddyShop.Domain;
using System;
using System.Collections.Generic;

namespace KiddyShop.Account
{
    public interface ITeacherRepository : IRepository<Account.Models.Teacher, System.Guid>
    {
        int countTeachers { get; set; }
        List<Models.Teacher> SearchTeacher(string filter, int pageIndex, int pageSize);
        List<Models.Teacher> SearchSemesterTeacher(Guid semesterId, Guid? divisionId, string filter, int pageIndex, int pageSize);
        List<Models.Teacher> GetSemesterTeacher(Guid semesterId);
        List<Models.Teacher> GetAvailableSemesterHomeroomTeachers(Guid semesterId);
        List<Models.Teacher> GetTeachersForClassCourse(Guid classCourseId);
        List<Models.Teacher> GetTeachersForCourse(Guid courseId);

        Models.Teacher CreateTeacher(Guid divisionId, string firstName, string lastName, string email, string phone, string highlightColor, bool isActive);
        Models.Teacher UpdateTeacher(Guid id, Guid divisionId, string firstName, string lastName, string email, string phone, string highlightColor, bool isActive);

        int CountSemesterTeacher(Guid semesterId);
    }
}
