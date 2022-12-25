﻿using ESCS.COMMON.Caches;
using ESCS.COMMON.Caches.interfaces;
using ESCS.COMMON.MongoDb;
using ESCS.COMMON.MongoDb.LogEntities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON.ExceptionHandlers
{
    public class OracleDbException : Exception
    {
        public OracleDbException(Exception ex) : base(GetMessage(ex))
        {

        }
        private static string GetMessage(Exception ex)
        {
            string errorCode = ex.Message;
            int firstIndex = errorCode.IndexOf("loi:");
            int lastIndex = errorCode.LastIndexOf(":loi");
            if (firstIndex == -1 || lastIndex == -1)
            {
                IMongoDBContext context = new MongoDBContext();
                ILogRequestRepository<LogException> _log = new LogRequestRepository<LogException>(context);
                LogException logException = new LogException("excute_stored", ex.ToString());
                _log.Add(logException);
                return errorCode;
            }
            string code = errorCode.Substring(firstIndex + 4, lastIndex - firstIndex - 4);
            return code;
        }
    }
}
