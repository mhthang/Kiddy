using KiddyShop.Data.EntityFramework;
using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private IDbFactory _dbFactory;
        private IKSDataContext _dbContext;
        public UnitOfWork()
        {
            this._dbFactory = new DbFactory();
            _dbContext = _dbFactory.Init();
        }

        public UnitOfWork(IKSDataContext context)
        {
            _dbContext = context;
        }

        public int SaveChanges()
        {
            return _dbContext.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        private void Dispose(bool disposing)
        {
            if (!disposing) return;
            if (_dbContext == null) return;
            _dbContext.Dispose();
            _dbContext = null;

            //_profileRepository = null;
            //_accountRepository = null;
            //_teacherRepository = null;

            //_classGroupRepository = null;
            //_classRoomRepository = null;
            //_courseRepository = null;
            //_divisionRepository = null;
            //_organizationRepository = null;
            //_semesterRepository = null;
            //_subjectGroupRepository = null;
            //_subjectRepository = null;
            //_buildingRepository = null;
            //_roomRepository = null;
            //_teacherDivisionRepository = null;

            //_classTimetableRepository = null;
            //_TimetableRepository = null;

            //_courseSectionRepository = null;
            //_schedulingTableRepository = null;

            //_courseSubjectRepository = null;
            //_trainingProgramRepository = null;

            //_messagingDataMappingRepository = null;
            //_messagingMessageRepository = null;
            //_messagingTemplateContentRepository = null;
            //_messagingTemplateRepository = null;
            //_messagingTypeRepository = null;
        }

    }
}
