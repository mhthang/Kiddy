using Autofac;
using KiddyShop.Account;
using KiddyShop.Account.Repositories;
using KiddyShop.Application;
using KiddyShop.Application.Repositories;
using KiddyShop.Community;
using KiddyShop.Community.Repositories;
using KiddyShop.Data.EntityFramework;
using KiddyShop.Domain;

namespace KiddyShop.Data.Repositories
{
    public class SKRepositoryAutoFacModule : Module
    {
        private readonly string _connStr;

        public SKRepositoryAutoFacModule(string connString)
        {
            this._connStr = connString;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new KSDataContext(_connStr)).As<IKSDataContext>().InstancePerRequest();

            #region Application
            builder.RegisterType<CountryRepository>().As<ICountryRepository>();
            builder.RegisterType<TimezoneRepository>().As<ITimezoneRepository>();

            builder.RegisterType<UserAttachmentRepository>().As<IUserAttachmentRepository>();
            builder.RegisterType<ProfileRepository>().As<IProfileRepository>();
            builder.RegisterType<PostCategoryRepository>().As<IPostCategoryRepository>();
            //builder.RegisterType<ClassGroupRepository>().As<IClassGroupRepository>();
            //builder.RegisterType<ClassRoomRepository>().As<IClassRoomRepository>();
            //builder.RegisterType<ClassCourseRepository>().As<IClassCourseRepository>();
            //builder.RegisterType<DivisionRepository>().As<IDivisionRepository>();
            //builder.RegisterType<OrganizationRepository>().As<IOrganizationRepository>();
            //builder.RegisterType<SemesterRepository>().As<ISemesterRepository>();
            //builder.RegisterType<SubjectGroupRepository>().As<ISubjectGroupRepository>();
            //builder.RegisterType<SubjectRepository>().As<ISubjectRepository>();
            //builder.RegisterType<BuildingRepository>().As<IBuildingRepository>();

            //builder.RegisterType<TimetableRepository>().As<ITimetableRepository>();
            //builder.RegisterType<ClassTimetableRepository>().As<IClassTimetableRepository>();

            //builder.RegisterType<CourseSectionRepository>().As<ICourseSectionRepository>();
            //builder.RegisterType<SchedulingTableRepository>().As<ISchedulingTableRepository>();

            //builder.RegisterType<CourseRepository>().As<ICourseRepository>();
            //builder.RegisterType<TrainingProgramRepository>().As<ITrainingProgramRepository>();

            //builder.RegisterType<TimetablingConstraintRepository>().As<ITimetablingConstraintRepository>();
            //builder.RegisterType<ProgramConstraintRepository>().As<IProgramConstraintRepository>();
            //builder.RegisterType<CourseConstraintRepository>().As<ICourseConstraintRepository>();
            //builder.RegisterType<TeacherConstraintRepository>().As<ITeacherConstraintRepository>();

            //builder.RegisterType<SchedulingTableRepository>().As<ISchedulingTableRepository>();

            #endregion

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
        }
    }
}