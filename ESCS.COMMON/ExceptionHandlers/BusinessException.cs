using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON.ExceptionHandlers
{
    public class BusinessException : Exception
    {
        public BusinessException(string message):base(message)
        {

        }
    }
}
