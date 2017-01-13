using Autofac;
using KiddyShop.Account.Services;
using KiddyShop.Community.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Services
{
    public class KSServicesAutoFacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //builder.RegisterType<Application.Services.ApplicationService>().As<Application.Services.IApplicationService>();

            builder.RegisterType<AccountService>().As<IAccountService>();
            builder.RegisterType<PostCategoryService>().As<IPostCategoryService>();
            //builder.RegisterType<ProfileService>().As<IProfileService>();
            //builder.RegisterType<TeacherService>().As<ITeacherService>();

            //builder.RegisterType<Organization.Services.DivisionService>().As<Organization.Services.IDivisionService>();
            //builder.RegisterType<Organization.Services.ClassGroupService>().As<Organization.Services.IClassGroupService>();
            //builder.RegisterType<Organization.Services.ClassRoomService>().As<Organization.Services.IClassRoomService>();
            //builder.RegisterType<Organization.Services.ClassCourseService>().As<Organization.Services.IClassCourseService>();
            //builder.RegisterType<Organization.Services.RoomService>().As<Organization.Services.IRoomService>();
            //builder.RegisterType<Organization.Services.SemesterService>().As<Organization.Services.ISemesterService>();
            //builder.RegisterType<Organization.Services.OrganizationService>().As<Organization.Services.IOrganizationService>();
            //builder.RegisterType<Organization.Services.SubjectGroupService>().As<Organization.Services.ISubjectGroupService>();
            //builder.RegisterType<Organization.Services.SubjectService>().As<Organization.Services.ISubjectService>();
            //builder.RegisterType<Organization.Services.BuildingService>().As<Organization.Services.IBuildingService>();

            //builder.RegisterType<TrainingProgram.Services.CourseService>().As<TrainingProgram.Services.ICourseService>();
            //builder.RegisterType<TrainingProgram.Services.TrainingProgramService>().As<TrainingProgram.Services.ITrainingProgramService>();

            //builder.RegisterType<Scheduler.ScheduleMan>().As<Scheduler.IScheduleMan>();
            //builder.RegisterType<Scheduler.TimetableService>().As<Scheduler.ITimetableService>();
            //builder.RegisterType<Scheduler.KatinaSchedulingService>().As<Scheduler.ISchedulingService>();

            //builder.RegisterType<Schedule.Services.ScheduleService>().As<Schedule.Services.IScheduleService>();

            //builder.RegisterType<Messaging.Services.MessagingMessageService>().As<Messaging.Services.IMessagingMessageService>();
            //builder.RegisterType<Messaging.Services.MessagingDatabindingHelperService>().As<Messaging.Services.IMessagingDatabindingHelperService>();

            //builder.RegisterType<Email.WorkingEmailService>().As<Email.IWorkingEmailService>();
            //builder.RegisterType<Email.GmailProvider>().As<Email.ISendMailProvider>();

            //builder.RegisterType<TimeSlotService>().As<ITimeSlotService>();
        }
    }

}
