using ESCS.COMMON.MongoDb;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON.MongoDb
{
    public interface ILogRequestRepository<TEntity> : IMongoDBRepository<TEntity> where TEntity : class
    {
    }
    public class LogRequestRepository<TEntity> : MongoDBRepository<TEntity>, ILogRequestRepository<TEntity> where TEntity : class
    {
        public LogRequestRepository(IMongoDBContext context):base(context)
        {

        }
    }
}
