using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON.ExceptionHandlers
{
    public class SessionException : Exception
    {
        public SessionException(string message):base(message)
        {

        }
    }
}
